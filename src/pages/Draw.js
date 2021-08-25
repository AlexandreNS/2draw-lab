import { Fragment, useRef, useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ColorPicker from 'material-ui-color-picker'

import { Canvas } from './../components/Canvas'
import { ClearButton } from './../components/ClearButton'
import { CanvasProvider } from './../contexts/CanvasContext'

import { useStyles } from '../styles/global'

export function Draw() {
  const classes = useStyles();
  const paperRef = useRef(null);
  const [configCanvas, setConfigCanvas] = useState({ width: 600, height: 600 });
  const [configTools, setConfigTools] = useState({ color: '#000', stroke: 5 });

  useEffect(() => {
    setConfigCanvas({ width: paperRef.current.clientWidth, height: 700 })
  }, [paperRef])

  const handleStrokeChange = (event, stroke) => {
    setConfigTools({ ...configTools, stroke });
  };

  const handleColorChange = color => {
    setConfigTools({ ...configTools, color });
  }

  return (
    <Fragment>
      <CanvasProvider>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.tools}>
                <div className={classes.stroke}>
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    Cor
                  </Typography>
                  <ColorPicker
                    style={{ backgroundColor: configTools.color }}
                    name='color'
                    className={classes.colorPicker}
                    value={configTools.color}
                    onChange={handleColorChange}
                  />
                </div>
                <div className={classes.stroke}>
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    Espessura
                  </Typography>
                  <Slider
                    defaultValue={5}
                    getAriaValueText={() => configTools.stroke}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={2}
                    max={40}
                    value={typeof configTools.stroke === 'number' ? configTools.stroke : 2}
                    onChange={handleStrokeChange}
                    valueLabelDisplay="auto"
                  />
                </div>

                <div className={classes.stroke}>
                  <ClearButton />
                </div>



              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} ref={paperRef}>
                <Canvas width={configCanvas.width} height={configCanvas.height} options={configTools} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </CanvasProvider>
    </Fragment >
  );
}