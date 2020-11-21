import { Parser } from '../Classes/Parser'

export interface ICoordinate {
  latitude: number | string,
  longitude: number | string,
}

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export async function kmRadius(centerCord: ICoordinate, pointCord: ICoordinate) {
  const radius = 6371

  const { latitude: latitude1, longitude: longitude1 } = centerCord
  const { latitude: latitude2, longitude: longitude2 } = pointCord

  const parser = new Parser()

  const lat1 = await parser.stringToNumber({ string: latitude1, isCordinate: true })
  const lat2 = await parser.stringToNumber({ string: latitude2, isCordinate: true })

  const lon1 = await parser.stringToNumber({ string: longitude1, isCordinate: true })
  const lon2 = await parser.stringToNumber({ string: longitude2, isCordinate: true })

  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) *
  Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = radius * center

  return distance
}
