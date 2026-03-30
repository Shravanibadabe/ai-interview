"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UpgradePage() {

  const addCoins = (amount: number) => {
    const current = Number(localStorage.getItem("coins") || 0)
    const updated = current + amount

    localStorage.setItem("coins", String(updated))

    alert(`✅ ${amount} coins added!`)
  }

  return (
    <div className="p-10 space-y-6">

      <h2 className="text-2xl font-bold text-purple-600">
        Upgrade Coins 🚀
      </h2>

      <p className="text-gray-500">
        Buy coins to continue your AI mock interviews.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {/* FREE */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">Free</h3>
            <p>20 Coins</p>
            <Button disabled className="w-full bg-gray-400">
              Default Plan
            </Button>
          </CardContent>
        </Card>

        {/* PRO */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">Pro</h3>
            <p>50 Coins</p>
            <Button
              className="w-full bg-purple-600"
              onClick={() => addCoins(50)}
            >
              Get 50 Coins
            </Button>
          </CardContent>
        </Card>

        {/* PREMIUM */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">Premium</h3>
            <p>150 Coins</p>
            <Button
              className="w-full bg-purple-600"
              onClick={() => addCoins(150)}
            >
              Get 150 Coins
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}