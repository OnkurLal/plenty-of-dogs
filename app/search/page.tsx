'use client';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/ui/LoadingSpinner';

export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [dogData, setDogData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dogList, setDogList] = useState<any>(null);
  const [IsNotMatch, setIsNotMatch] = useState(false);
  const [unfilteredDogList, setUnfilteredDogList] = useState<any>(null);
  const [showOptions, setShowOptions] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list');
        const data = await response.json();
        setDogList(data);
        setUnfilteredDogList(data);
      } catch (error:any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    if (unfilteredDogList?.message) {
    const selectFilteredList = unfilteredDogList?.message.filter((breed:string) => breed.includes(e.target.value));
    setDogList({message:selectFilteredList});
    }
  };

  const handleSelectClick = (e:any) => {
    setShowOptions(false)
    setInputValue(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!dogList.message.includes(inputValue) ) {
      setIsNotMatch(true)
      setDogData(null)
    }else{
      try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${inputValue}/images`,
      );
      const data = await response.json();
      setDogData(data);
      } catch (err: any) {
      setError(err);
      } finally {
      setLoading(false);
      }
      setIsNotMatch(false)
    }
    setInputValue('')
    setShowOptions(false)
  };
  const dogDataMap = dogData?.message.map((item: string) => {
    return (
      <img style={{ width: 400, height: 400 }} src={item} alt="random image" />
    );
  });

  if (loading) {
    return (
    <LoadingSpinner />
    );
  }

  if (error) {
    return <p>An error occurred: {error}</p>;
  }
  console.log(inputValue)
  return (
    <div onClickCapture={() => setShowOptions(false)} className="flex flex-col items-center">
      <h1 className="m-4 text-3xl ">Search by Breed!</h1>
      <div>
        {IsNotMatch ? 'Breed name is misspelled or not in records' : null}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className='w-full'>
        <label className="m-4m block text-xl">
          Breed name:
          <br />
          <input
            type="text"
            placeholder="Type in a dogbreed to begin"
            value={inputValue}
            onChange={(e) => handleChange(e)}
            onClick={() => setShowOptions(true)}
            // onBlur={() => setShowOptions(!showOptions)}
            className="form-input w-full mt-4 outline outline-2 outline-offset-2 outline-neutral-200"
          />
          {showOptions? <select onClick={(e) => handleSelectClick(e)} size={dogList?.message.length} > 
            {dogList ? dogList.message.map((item:string) => {return <option >{item}</option>}):null}
          </select>:<select hidden onClick={(e) => handleSelectClick(e)} size={dogList?.message.length} > 
            {dogList ? dogList.message.map((item:string) => {return <option >{item}</option>}):null}
          </select>}
        </label>
        </div >
        <div className='grid justify-items-center'>
        <button type="submit" className="btn rounded bg-green-500 text-white mt-4 py-1 px-4 hover:bg-green-700">
          Search
        </button>
        </div>
      </form>
      {dogData ? (
        <div className="mt-8 grid grid-cols-3 gap-4">{dogDataMap}</div>
      ) : null}
    </div>
  );
}