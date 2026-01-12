'use client'

import {useEffect, useRef } from 'react'

import { seedDatabase } from '@/data/seedDb/seedDatabase'

export function PopulateFunc({children}: {children: React.ReactNode}){
    const isInitialized = useRef(false)

    useEffect(() => {
        if(!isInitialized.current){
            isInitialized.current = true
            seedDatabase().catch(console.error)
        }
    }, [])

    return <>{children}</>
}