import { useState } from 'react';
import Select from 'react-select';

const Search = () => {

    const [query, setQuery] = useState("");

    const handleInputChange = (inputValue, { action }) => {
        if (action === 'input-change') {
          console.log('Valor de entrada:', inputValue);
          // Puedes realizar acciones adicionales con el valor de entrada aquí

          
        }
      };

    return (
        <div className="flex justify-center items-center p-5 mb-5">
            <Select className='w-1/3' isSearchable
                onInputChange={handleInputChange}
                options={[ /* Tus opciones aquí */]} />
        </div>
    );
}

export default Search;