import React from 'react'
import { Paper, Typography } from '@mui/material'
import { fetchFromAPI } from '../utilities/fetchFromAPI';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { Button } from '@mui/material'


const Slider  = () => {
    const [videos, setVideos] = useState([]);

    useEffect(()=>{
      fetchFromAPI(`trending/all/day`).then((data)=>setVideos(data));
    }, []);

    console.log(videos);

  return (
            <></>

  )
}

export default Slider;