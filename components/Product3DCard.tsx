import { Dispatch, SetStateAction, MouseEvent } from 'react'

// 1. กำหนด Type ของ Props ที่รับเข้ามา
interface Product3DCardProps {
  product: any // หรือระบุ Type ของ product ให้ตรงกับใน page.tsx
  isSaved: boolean
  onToggleSave: (id: number, e?: MouseEvent<Element, globalThis.MouseEvent>) => void
  onSelect: Dispatch<SetStateAction<any>>
}

// 2. ใส่ Props เข้าไปใน ฟังก์ชัน Component
export default function Product3DCard({
  product,
  isSaved,
  onToggleSave,
  onSelect,
}: Product3DCardProps) {
  return (
    <div onClick={() => onSelect(product)}>
      <h3>{product?.name || 'Product 3D Card'}</h3>
      <button onClick={(e) => onToggleSave(product.id, e)}>
        {isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  )
}