import React, { FC } from 'react'

export interface ModalActionsProps {
  children: any
}

const ModalActions: FC<ModalActionsProps> = ({ children }) => {
  return <div className="flex items-center justify-end gap-4">{children}</div>
}

export default ModalActions
