'use client'

import { useState } from "react"
import Text from "@/components/Text"
import Button from "@/components/Button"

export default function RandomPage() {
  const [superRandom, setSuperRandom] = useState<string>("")

  const display = () => {
    const r:string = superRandomNum().toString()
    const i:string = superRandomNum().toString()
    const generated:string =  `${randomSign()}${r}${randomSignMid()}${i}i`
    setSuperRandom(generated)
  }

  return (
    <div>
    <Text>乱数で指定した範囲の乱数を生成するとかいうただの頭おかしいページです。<br/>桁数を増やしすぎた結果、確率的に桁数が偏るようになりました。</Text>

    <Button label="乱数生成" onClick={display} />

    <div className="bg-gray-200 rounded-md border-2 border-gray-300 p-5 mt-4">
      <Text>{superRandom}</Text>
    </div>
    </div>
  )
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomSign() {
  return Math.random() < 0.5 ? '-' : ''
}

function randomSignMid() {
  return Math.random() < 0.5 ? '-' : '+'
}

function superRandomNum() {
  const min = random(1, 999999999999)
  const max = random(min, 1000000000000)
  return `${random(min, max)}`
}