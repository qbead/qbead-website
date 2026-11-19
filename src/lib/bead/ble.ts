/** Web Bluetooth transport using the Nordic UART service, as in `Gate_Trainer.ino`. */
import type { Connect } from './link'

const NUS_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
const NUS_RX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e' // page -> bead (write)
const NUS_TX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e' // bead -> page (notify)

// Web Bluetooth has no bundled TypeScript types, so the browser object is typed loosely here.
const getBluetooth = (): any =>
  typeof navigator === 'undefined' ? undefined : (navigator as any).bluetooth

/** True if this browser can pair a bead over Bluetooth (Chrome and Edge, not Firefox or Safari). */
export const supportsBluetooth = () => !!getBluetooth()

/** Pair a bead over Bluetooth. Opens the browser's device picker. */
export const connectBle: Connect = async ({ onText, onClose }) => {
  const device = await getBluetooth().requestDevice({
    filters: [{ namePrefix: 'qbead' }, { services: [NUS_SERVICE] }],
    optionalServices: [NUS_SERVICE],
  })
  device.addEventListener('gattserverdisconnected', onClose)
  try {
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService(NUS_SERVICE)
    const rx = await service.getCharacteristic(NUS_RX)
    const tx = await service.getCharacteristic(NUS_TX)

    const decoder = new TextDecoder()
    tx.addEventListener('characteristicvaluechanged', (e: any) =>
      onText(decoder.decode(e.target.value))
    )
    await tx.startNotifications()

    // BLE packets are small: send in 20-byte pieces, one after another.
    const encoder = new TextEncoder()
    let queue: Promise<void> = Promise.resolve()

    return {
      write(line) {
        const bytes = encoder.encode(line + '\n')
        const done = queue.then(async () => {
          for (let i = 0; i < bytes.length; i += 20) {
            const part = bytes.slice(i, i + 20)
            if (rx.writeValueWithoutResponse) await rx.writeValueWithoutResponse(part)
            else await rx.writeValue(part)
          }
        })
        queue = done.catch(() => {}) // one failed write must not block the ones after it
        return done
      },
      async close() {
        try {
          device.gatt.disconnect()
        } catch {
          // already disconnected
        }
      },
    }
  } catch (err) {
    try {
      device.gatt.disconnect()
    } catch {
      // already disconnected
    }
    throw err
  }
}
