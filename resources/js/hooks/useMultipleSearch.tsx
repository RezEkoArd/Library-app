import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

export  function useMultipleSearch(initialFilter = {}) {
    const [filter,setFilter] = useState(initialFilter);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(window.location.pathname,
                filter,
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        },500);

        return () => clearTimeout(timeoutId);
    }, [filter]);

    const updateFilter = (key, value) => {
            setFilter(prev => ({
                ...prev,
                [key]: value
            }));
    }
  return {filter, updateFilter}
}
