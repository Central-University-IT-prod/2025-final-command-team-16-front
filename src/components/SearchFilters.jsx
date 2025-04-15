"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    location: '',
    author: '',
  });

  const genres = ["Фантастика", "Роман", "Детектив", "Научная литература", "Биография", "Поэзия", "Учебная литература"];
  const locations = ["Москва", "Санкт-Петербург", "Казань", "Новосибирск", "Екатеринбург"];

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // useEffect(() => {
  //   onFilterChange(filters);
  // }, [filters, onFilterChange]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Фильтры поиска</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="search">Поиск по названию</Label>
          <Input 
            id="search"
            placeholder="Введите название книги" 
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="genre">Жанр</Label>
          <Select 
            value={filters.genre} 
            onValueChange={(value) => handleChange('genre', value)}
          >
            <SelectTrigger id="genre">
              <SelectValue placeholder="Выберите жанр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все жанры</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Местоположение</Label>
          <Select 
            value={filters.location} 
            onValueChange={(value) => handleChange('location', value)}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все города</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="author">Автор</Label>
          <Input 
            id="author"
            placeholder="Введите имя автора" 
            value={filters.author}
            onChange={(e) => handleChange('author', e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          onClick={() => setFilters({search: '', genre: '', location: '', author: ''})}
        >
          Сбросить
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;