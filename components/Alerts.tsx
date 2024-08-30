'use client'

import React, { useState } from "react"
import { Alert, AlertContent, AlertDescription, AlertClose } from "@/components/ui/alert"
import { CheckCircleFill } from "@/components/icons"

export default function Alerts() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert>
      <AlertContent>
        <CheckCircleFill width={18} height={18} className="text-black" />
        <AlertDescription>
          I'm a single alert message.
        </AlertDescription>
      </AlertContent>
      <AlertClose onClick={() => setIsVisible(false)}>
        close
      </AlertClose>
    </Alert>
  )
}