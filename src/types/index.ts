import { BigNumber } from '@ethersproject/bignumber'
import { CurrencyAmount, Token } from '@foxlottery/core-sdk'

export type MethodArg = string | number | BigNumber
export type MethodArgs = Array<MethodArg | MethodArg[]>

export type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined

export type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token> | undefined>
