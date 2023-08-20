import { CircularProgress, Container, Stack, Typography } from "@mui/material"
import { IHouse } from "../Api/interfaces"
import { formatCurrency } from "../utils"
import { useEffect, useState } from "react"

interface IHouseMortageProps {
  house: IHouse
}

interface IMortage {
  [key: string]: {
    installment: number,
    risk: number
  },
}

interface IEntrance {
  entrance: number
  houseCost: number
  adminCost: number
}

export const HouseMortage = ({ house }: IHouseMortageProps) => {
  //             Didac + Ana
  const salary = 2400 + 1200

  const [mortage, setMortage] = useState<IMortage>()
  const [entrance, setEntrance] = useState<IEntrance>()

  const calculateMortageMonthly = (capital: number, years: number, TIN: number): number => {
    const installments = years * 12
    const TINDivided = (TIN / 12) / 100
    const totalTIN = Math.pow((1 + TINDivided), installments)

    return parseFloat((capital * ((totalTIN * TINDivided) / (totalTIN - 1))).toFixed(2))
  }


  const calculateMortage = (capital: number) => {
    const thirty = calculateMortageMonthly(capital, 30, 3.7)
    const twentyFive = calculateMortageMonthly(capital, 25, 3.7)
    const twenty = calculateMortageMonthly(capital, 20, 3.7)
    const fifteen = calculateMortageMonthly(capital, 15, 3.7)
    const ten = calculateMortageMonthly(capital, 10, 3.7)
    const five = calculateMortageMonthly(capital, 5, 3.7)

    setMortage({
      30: {
        installment: thirty,
        risk: (thirty * 100) / salary
      },
      25: {
        installment: twentyFive,
        risk: (twentyFive * 100) / salary
      },
      20: {
        installment: twenty,
        risk: (twenty * 100) / salary
      },
      15: {
        installment: fifteen,
        risk: (fifteen * 100) / salary
      },
      10: {
        installment: ten,
        risk: (ten * 100) / salary
      },
      5: {
        installment: five,
        risk: (five * 100) / salary
      }
    })
  }

  const calculateEntrance = () => {
    const houseCost = house.realPrice * .2
    const adminCost = (houseCost * .1) + 2000

    setEntrance({
      entrance: houseCost + adminCost,
      houseCost,
      adminCost
    })
  }

  const calculateCapital = () => {
    return house.realPrice * .8
  }

  useEffect(() => {
    calculateMortage(calculateCapital())
    calculateEntrance()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!mortage || !entrance) return <CircularProgress color='secondary' />

  return (
    <Container>
      <Typography variant="h5">Hipoteca</Typography>
      <Stack sx={{
        flexDirection: {
          sm: 'column',
          md: 'row'
        },
        gap: {
          sm: '0',
          md: '.5rem'
        }
      }}>
        <Typography>Casa: {formatCurrency(house.realPrice)}</Typography>
        <Typography>Hipoteca: {formatCurrency(calculateCapital())}</Typography>
        <Typography>Entrada: {formatCurrency(entrance.houseCost)} + {formatCurrency(entrance.adminCost)} = {formatCurrency(entrance.entrance)}</Typography>
      </Stack>
      <Stack direction='column' marginTop='1rem'>
        <Stack direction='row' paddingX='1rem' alignItems='center' justifyContent='space-between' border='1px solid #000'>
          <Typography variant="h6">Años</Typography>
          <Typography variant="h6">Cuota</Typography>
          <Typography variant="h6">Riesgo</Typography>
        </Stack>
        {Object.keys(mortage).map((key) => (
          <Stack key={key} direction='row' paddingX='1rem' marginTop='-1px' alignItems='center' justifyContent='space-between' border='1px solid #000'>
            <Typography>{key} años</Typography>
            <Typography>{formatCurrency(mortage[key].installment)}/mes</Typography>
            <Typography color={(mortage[key].risk > 40) ? 'red' : (mortage[key].risk > 30) ? 'orange' : 'green'}>{mortage[key].risk.toFixed(2)}%</Typography>
          </Stack>
        ))}
        <Typography variant="mini">* Estos calculos se hacen para una hipoteca fija con un TIN del 3.7% (puede variar)</Typography>
      </Stack>
    </Container>
  )
}