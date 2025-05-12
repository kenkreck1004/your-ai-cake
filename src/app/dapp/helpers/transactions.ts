import { Transaction } from '@mysten/sui/transactions'
import { fullFunctionName } from '~~/helpers/network'

export const prepareCreateGreetingTransaction = (
  packageId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [],
    target: fullFunctionName(packageId, 'create'),
  })

  return tx
}

export const prepareSetGreetingTransaction = (
  packageId: string,
  objectId: string,
  name: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [tx.object(objectId), tx.pure.string(name), tx.object('0x8')],
    target: fullFunctionName(packageId, 'set_greeting'),
  })

  return tx
}

export const prepareResetGreetingTransaction = (
  packageId: string,
  objectId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [tx.object(objectId)],
    target: fullFunctionName(packageId, 'reset_greeting'),
  })

  return tx
}

export const prepareMintCharacteristicTransaction = (
  packageId: string,
  name: string,
  description: string,
  imageUrl: string,
  fee: number
): Transaction => {

  console.log(fullFunctionName(packageId, 'mint'));

  const tx = new Transaction()

  // Tách coin từ gas, tạo ra 1 coin mới có giá trị bằng fee
  const [payment] = tx.splitCoins(tx.gas, [tx.pure.u64(fee)])

  // Gọi hàm smart contract mint(...)
  tx.moveCall({
    target: fullFunctionName(packageId, 'mint'),
    arguments: [
      tx.pure.string(name),
      tx.pure.string(description),
      tx.pure.string(imageUrl),
      payment,
    ],
  })

  // console.log(tx);

  return tx
}
