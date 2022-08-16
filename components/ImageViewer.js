import React, { useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import SwipeableViews from 'react-swipeable-views';
import Image from 'next/image'
import { Grid, IconButton } from '@mui/material';


export const strandInfoFontSize = 12;


export default React.memo(function ImageViewer(props) {

  const { photos, fullscreenPhotoIndex, setFullscreenPhotoIndex, ...restOfProps } = props;

  const [fullscreenPhotoIndexBackup, setFullscreenPhotoIndexBackup] = useState(null);

  return (

    <div style={{
      position: "fixed",
      background: "#FFFC",
      top: 0, bottom: 0, left: 0, right: 0,
      textAlign: "center",
      verticalAlign: "center",
      pointerEvents: fullscreenPhotoIndex !== null ? "inherit" : "none",
      opacity: fullscreenPhotoIndex !== null ? 1.0 : 0.0,
      transition: "opacity 400ms ease",
      zIndex: 100,
      // padding: 40,
    }}
      onClick={() => {
        setFullscreenPhotoIndexBackup(fullscreenPhotoIndex);
        setFullscreenPhotoIndex(null);
        // setTimeout(() => setFullscreenPhotoIndexBackup(null), 600);
      }}
      {...restOfProps}
    >

      <ClearIcon
        style={{
          fontSize: "26px", fontWeight: "500", 
          position: "absolute", left: 30, top: 30
        }}
      />

      <SwipeableViews
        index={fullscreenPhotoIndex !== null ? fullscreenPhotoIndex : fullscreenPhotoIndexBackup}
        disableLazyLoading={false}
        resistance={true}
        onChangeIndex={(index) => setFullscreenPhotoIndex(index)}
        style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%" }}
        containerStyle={{
          width: "100%", height: "100%",
          transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',

        }}
      >
        {photos.map((photo, i) =>
          <div key={i} style={{
            position: "relative",
            width: "calc(100vw - 80px)", height: "calc(100vh - 80px)",
            marginLeft: 40,
            marginTop: 40,
          }}>
            <Image
              src={photo}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        )}
      </SwipeableViews>


      <div style={{
        position: "absolute",
        left: 0, right: 0, top: 0, bottom: 0,
        pointerEvents: "none",
      }}>
        <Grid container style={{ height: "100%" }} alignItems="center" justifyContent="space-between">
          <Grid item>
            <IconButton
              onClick={e => {
                setFullscreenPhotoIndex(prevPhotoIndex => prevPhotoIndex - 1);
                e.stopPropagation();
              }}
              style={{
                transform: `scale(${fullscreenPhotoIndex > 0 ? 1.0 : 0.0})`,
                transition: "transform 400ms ease",
                pointerEvents: "auto",
              }}>
              <ChevronLeftIcon style={{ fontSize: 42 }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={e => {
                setFullscreenPhotoIndex(prevPhotoIndex => prevPhotoIndex + 1);
                e.stopPropagation();
              }}
              style={{
                transform: `scale(${photos && fullscreenPhotoIndex < photos.length - 1 ? 1.0 : 0.0})`,
                transition: "transform 400ms ease",
                pointerEvents: "auto",
              }}>
              <ChevronRightIcon style={{ fontSize: 42 }} />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div >
  );
});
