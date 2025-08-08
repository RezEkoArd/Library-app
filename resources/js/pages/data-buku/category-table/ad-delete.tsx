import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Category } from "./column";
import { useState } from "react";
import { toast } from "sonner";
import { router } from '@inertiajs/react';

// Component AlertDialog Delete yang terpisah
interface AlertDialogDeleteProps {
    category: Category;
}

export const AlertDialogDelete = ({ category }: AlertDialogDeleteProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = () => {
      setIsDeleting(true);
      
      router.delete(`/kategori-buku/${category.id}`, {
        onSuccess: (page) => {
          // Cek jika ada success message dari backend
        //   if (page.props.flash?.success) {
        //     toast.success(page.props.flash.success as string);
        //   } else {
        //     toast.success(`Kategori "${category.nama_kategori}" berhasil dihapus`);
        //   }
        },
        onError: (errors) => {
          // Handle error dari backend
          if (errors.errorMessage) {
            toast.error(errors.errorMessage as string);
          } else {
            toast.error('Gagal menghapus kategori');
          }
        },
        onFinish: () => {
          setIsDeleting(false);
        }
      });
    };
  
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Kategori Buku</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus kategori <strong>"{category.nama_kategori}"</strong>? 
            Tindakan ini tidak dapat dibatalkan dan akan menghapus kategori secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menghapus...
              </div>
            ) : (
              'Hapus'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
};