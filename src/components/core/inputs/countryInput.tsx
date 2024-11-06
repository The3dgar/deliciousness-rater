import countries from '@/lib/data/countries.json';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Props {
  defaultValue?: string;
  onChange: (value: string) => void;
}

export function CountryInput({ defaultValue = '', onChange }: Props) {
  const [country, setCountry] = useState(defaultValue);

  const handleChange = (value: string) => {
    setCountry(value);
    onChange(value);
  };
  return (
    <Select name='country' value={country} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder='Select a country' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {countries.map((country) => (
            <SelectItem key={country.cca2} value={country.cca2}>
              {country.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
