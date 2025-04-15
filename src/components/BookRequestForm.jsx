import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PICKUP_LOCATIONS = [
    { id: 1, name: "Библиотека им. Ленина" },
    { id: 2, name: "Книжный магазин 'Читай-город'" },
    { id: 3, name: "Пункт выдачи на Невском" },
    { id: 4, name: "Центральная библиотека" },
    { id: 5, name: "Дом книги" }
];

const BookRequestForm = ({ bookId, onRequestSubmit }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        onRequestSubmit({ ...data, bookId });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

            <div className="space-y-2">
                <Label htmlFor="pickupLocation">Место получения</Label>
                <Controller
                    name="pickupLocation"
                    control={control}
                    rules={{ required: "Выберите место получения" }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите место получения" />
                            </SelectTrigger>
                            <SelectContent>
                                {PICKUP_LOCATIONS.map((location) => (
                                    <SelectItem key={location.id} value={location.id.toString()}>
                                        {location.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.pickupLocation && <span className="text-red-500">{errors.pickupLocation.message}</span>}
            </div>



            <Button type="submit">Отправить запрос</Button>
        </form>
    );
};

export default BookRequestForm;
