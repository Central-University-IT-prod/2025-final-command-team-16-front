"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {BASE_URL} from "@/services/constants";
import {useMutation} from "@tanstack/react-query";
import {addBook} from "@/services/book.service";

const BOOK_BINDING_TYPES = {
    HARDCOVER: "Твёрдая обложка",
    SOFTCOVER: "Мягкая обложка"
};

const BOOK_GENRE_TYPES = {
    FANTASY: "Фэнтези",
    SCIENCE_FICTION: "Научная фантастика",
    DETECTIVE: "Детектив",
    ROMANCE: "Роман",
    THRILLER: "Триллер",
    HORROR: "Ужасы",
    NON_FICTION: "Нон-фикшн",
    BIOGRAPHY: "Биография",
    HISTORY: "История",
    ADVENTURE: "Приключения",
    PHILOSOPHY: "Философия",
    POETRY: "Поэзия",
    DRAMA: "Драма",
    COMIC: "Комикс",
    PSYCHOLOGY: "Психология",
    FOLKLORE: "Фольклор",
    MYTHOLOGY: "Мифология",
    FAIRY_TALES: "Сказки",
    CLASSIC: "Классика",
    PUBLICISTIC: "Публицистика",
    SELF_HELP: "Саморазвитие",
    SHORT_STORIES: "Рассказы",
    FANTASTIC: "Фантастика"
};

const BOOK_SIZE_TYPES = {
    SMALL: "Маленькая",
    STANDARD: "Стандартная",
    BIG: "Большая"
};

const BOOK_STATE_TYPES = {
    NEW: "Новая",
    GOOD: "Хорошая",
    MINOR_DAMAGE: "С небольшими повреждениями",
    MAJOR_DAMAGE: "С большими повреждениями"
};

const AddBookForm = ({ className, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            genre: "",
            binding: "",
            size: "",
            condition: "",
            point_id: 1
        }
    });

    const addBookMutation = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            onClose();
        }
    });

    const onSubmit = async (data) => {
        const formData = new FormData();

        const bookData = {
            size: data.size,
            genre: data.genre,
            binding: data.binding,
            point_id: 1,
            author: data.author,
            name: data.name,
            pages_count: parseInt(data.pages),
            language: data.language,
            condition: data.condition,
            publisher: data.publisher,
            description: data.description,
            year: parseInt(data.year)
        };

        formData.append('book_create', JSON.stringify(bookData));

        if (selectedFiles.length > 0) {
            selectedFiles.forEach(file => {
                formData.append('file', file);
            });
        }

        addBookMutation.mutate(formData);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("grid grid-cols-2 gap-4", className)}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Название книги</Label>
                <Input {...register("name", {required: "Обязательное поле"})} id="name"/>
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="author">Автор</Label>
                <Input {...register("author", {required: "Обязательное поле"})} id="author"/>
                {errors.author && <span className="text-red-500">{errors.author.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Input {...register("description")} id="description"/>
            </div>

            <div className="space-y-2">
                <Label htmlFor="genre">Жанр</Label>
                <Controller
                    name="genre"
                    control={control}
                    rules={{required: "Выберите жанр"}}
                    render={({field}) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите жанр"/>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(BOOK_GENRE_TYPES).map((genre) => (
                                    <SelectItem key={genre} value={genre}>
                                        {genre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.genre && <span className="text-red-500">{errors.genre.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="year">Год издания</Label>
                <Input
                    {...register("year", {
                        required: "Обязательное поле",
                        validate: (value) =>
                            (value >= 1000 && value <= new Date().getFullYear()) ||
                            "Некорректный год"
                    })}
                    type="number"
                    id="year"
                />
                {errors.year && <span className="text-red-500">{errors.year.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="publisher">Издательство</Label>
                <Input {...register("publisher")} id="publisher"/>
            </div>

            <div className="space-y-2">
                <Label htmlFor="language">Язык</Label>
                <Input {...register("language")} id="language"/>
            </div>

            <div className="space-y-2">
                <Label htmlFor="binding">Переплёт</Label>
                <Controller
                    name="binding"
                    control={control}
                    rules={{required: "Выберите переплёт"}}
                    render={({field}) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите переплёт"/>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(BOOK_BINDING_TYPES).map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.binding && <span className="text-red-500">{errors.binding.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="pages">Количество страниц</Label>
                <Input
                    {...register("pages", {
                        required: "Обязательное поле",
                        validate: (value) => value > 0 || "Некорректное значение"
                    })}
                    type="number"
                    id="pages"
                />
                {errors.pages && <span className="text-red-500">{errors.pages.message}</span>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="size">Размер книги</Label>
                <Controller
                    name="size"
                    control={control}
                    rules={{required: "Выберите размер"}}
                    render={({field}) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите размер"/>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(BOOK_SIZE_TYPES).map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.size && <span className="text-red-500">{errors.size.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="photos">Фотографии книги (минимум 1)</Label>
                <Input
                    type="file"
                    {...register("photos", {
                        required: "Необходимо загрузить минимум 1 фото",
                        validate: {
                            minFiles: (files) => files?.length >= 1 || "Минимум 1 фотография",
                            fileType: (files) => {
                                for (let i = 0; i < files?.length; i++) {
                                    if (!files[i].type.startsWith('image/')) {
                                        return "Разрешены только изображения";
                                    }
                                }
                                return true;
                            }
                        }
                    })}
                    id="photos"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-accent"
                />
                {errors.photos && <span className="text-red-500">{errors.photos.message}</span>}
                {selectedFiles.length > 0 && (
                    <div className="mt-2">
                        <p>Выбрано файлов: {selectedFiles.length}</p>
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="condition">Состояние</Label>
                <Controller
                    name="condition"
                    control={control}
                    rules={{required: "Выберите состояние"}}
                    render={({field}) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите состояние"/>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(BOOK_STATE_TYPES).map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.condition && <span className="text-red-500">{errors.condition.message}</span>}
            </div>

            <div className="col-span-2 flex gap-4 pt-4">
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Отправка..." : "Добавить"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    Отмена
                </Button>
            </div>
        </form>
    );
};

export default AddBookForm;
