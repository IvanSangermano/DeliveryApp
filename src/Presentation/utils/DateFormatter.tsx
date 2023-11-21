import React from 'react'

export const DateFormatter = (timestamp: number): string => {

    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + (date.getDay())).slice(-2)
    const hours = ('0' + (date.getHours())).slice(-2)
    const min = ('0' + (date.getMinutes())).slice(-2)

    return `${day}/${month}/${year} ${hours}:${min}` 
}
