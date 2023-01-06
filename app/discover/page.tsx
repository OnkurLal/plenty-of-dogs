'use client';
import React, {useState, useEffect} from 'react';
import LoadingSpinner from '@/ui/LoadingSpinner';

export default function Page() {
    const [matches, setMatches] = useState(0);
    const [dogData, setDogData] = useState<any>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setcount] = useState(0);
    const [isMatch, setIsMatch] = useState(false);
    const myNumber = 2;

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            setDogData(data);
          } catch (error:any) {
            setError(error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
      }, [count]);
    
    const handleClick = (e:any) => {
        setcount(count+1)
        if (e.target.name === 'thumbsup'){
            const randomNumber = Math.floor(Math.random() * 5) + 1
            if (randomNumber === myNumber){
                setMatches(matches+1)
                setIsMatch(true)
            }else {
                setIsMatch(false)
            }
        }else{
            setIsMatch(false)
        }
        
    };

    if (loading) {
        return (
        <LoadingSpinner />
        );
      }
    
      if (error) {
        return <p>An error occurred: {error}</p>;
      }
    return (
    <>
    <div className='grid justify-items-center'>
        <h1 className='text-4xl p-4'>Make New Friends!</h1>
        <h3 className='text-2xl pb-4'>Thumbs up on any pups you'd like to meet!</h3>
        <div className='relative'>
        {dogData && <img src={dogData?.message} alt="dog" style={{height:400, width:400}}/> }
        <button name='thumbsup' onClick={(e) => handleClick(e)} className="p-2 text-xl absolute bg-green-700 bottom-7 right-2 rounded-full">👍</button>
        <button onClick={(e) => handleClick(e)} className="p-2 text-xl absolute bottom-7 left-2 bg-red-600 rounded-full">👎</button>
        </div>
        <h1 className='text-4xl p-4'>Made friends with {matches} pups so far!</h1>
        <div className='container' >
        <p className='p-2 text-center text-green-900' style={{backgroundColor:isMatch? 'lightgreen': ''}}>{isMatch? "Yay! That Pup Liked You Too!!!" : null} </p>
        </div>
    </div>
    </>
    )
}