import { Button } from '@/components/ui/button';
import React from 'react';
import { useCreateListModal } from '../hooks/use-create-list-modal';

export const ListsNotFound = () => {
  const { open: openCreateList } = useCreateListModal();

  return (
    <div className="flex flex-col justify-center items-center h-[80dvh]">
    <img
      src="/images/create-first-list.webp"
      alt="404"
      className="w-1/3 max-w-md aspect-square rounded-xl"
    />
    <p className="text-5xl font-bold">List not found</p>
    <Button variant="default" size="lg" onClick={openCreateList} className="mt-10">
      Crear lista
    </Button>
  </div>
  )
}
