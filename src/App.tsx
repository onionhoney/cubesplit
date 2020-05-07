import React, { useEffect } from 'react';
import './App.css';
import Cube, { Timeline } from './Cube';
import Table from './Table';
import { parse } from "cubing/alg";
import { Solve, StageAvg } from './Defs';
import { solves, emptySolve } from './Sample';

import { Button } from 'rebass';

const PREAMBLE = 5.0
const APP_TOP = 30, APP_LEFT = 30

function CubeLoader(props: {counter: number, data: Solve, time: number}) {
  let { data, time, counter } = props
  let seq = React.useMemo( () => {
    const offset = (data.starting_time - time) * 1000
    let s = []
    let cumu_time = 0
    for (let step of data.stages) {
      let step_time_ms = step.time * 1000
      let step_seq = parse(step.moves).nestedUnits
      console.log(step, step_seq)

      // let's "guess the pause"!!
      const pause = Math.min(250, step_time_ms * 0.3)
      for (let i = 0; i < step_seq.length; i++) {
        let block_move = step_seq[i]
        s.push({
          move: block_move,
          timeStamp: cumu_time + pause + (step_time_ms- pause)/ step_seq.length * i + offset
        } as Timeline)
      }
      cumu_time += step_time_ms
    }
    return s
  }, [data, counter])
  return <Cube timelineSeq={seq} counter={counter} scramble={data.scramble}/>
}

const APP_WIDTH = 300, APP_HEIGHT = 720

function App() {
  const [currTime, setCurrTime ] = React.useState(25)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [x, setX] = React.useState(20)
  const [a, setA] = React.useState(0.9)
  const [margin, setMargin]= React.useState({l: 10, r:10, u: 10, d:20})
  const [y, setY] = React.useState(1)
  const [vh, setVH] = React.useState(900)
  const [sz, setSz] = React.useState(0.8)

  const [dataText, setDataText] = React.useState(JSON.stringify(solves, null, 2))
  const [data, setData] = React.useState<Solve[]>(solves)

  const [counter, incrCounter] = React.useState(0)

  useEffect( () => {
    const handleVideoTimeUpdate = () => {
      const func = () => {
        if (videoRef.current === null) return;
        let video = videoRef.current;
        if (!video) return;
        if (video.duration > 1)
          setCurrTime(video.currentTime)

      }
      func();
    }
    const i = setInterval(handleVideoTimeUpdate, 30);
    return () => clearInterval(i)
  })

  const activeSolve = data.filter((s: Solve, i: number) => {
     return s.starting_time - PREAMBLE <= currTime
  }).pop() || emptySolve

  // const activeSolve_time = React.useMemo(() => {
  //   if (activeSolve) {
  //     return activeSolve.stages.map(x => x.time).reduce((x, y) => x + y, 0)
  //   } else return 0
  // }, [activeSolve])

  useEffect( () => {
    incrCounter(counter + 1)
  }, [activeSolve] )

  const displayTime = activeSolve ? (currTime - activeSolve.starting_time) : 0

  // On the edge we start triggering the animation
  const setVideo = (file: Blob) => {
    let videofile = new File([file], 'videofile');
    let videourl = URL.createObjectURL(videofile);
    if (videoRef.current) {
      videoRef.current!.src = videourl;
      videoRef.current!.load();
      videoRef.current!.currentTime = currTime;
    }
  }
  const resetTime = () => incrCounter(counter + 1)

  const avgSolve = React.useMemo( () => {
    if (data.length === 0) return []
    const get_avg = (arr : number[]) => {
      arr.sort((a, b) => a - b)
      let sum = 0
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      if (arr.length <= 3) return sum / arr.length
      return (sum - arr[0] - arr[arr.length - 1]) / (arr.length - 2)
    }
    const a : any = {}
    const equiv = (s : string) => {
      return (s === 'EOFBb' ? 'EOLRb' : s)
    }
    for (let stage of data[0].stages) a[equiv(stage.name)] = []
    console.log(a)
    for (let solve of data) {
      for (let stage of solve.stages) {
        a[equiv(stage.name)].push(stage.time)
      }
    }
    let avg : StageAvg[] = [];
    for (let stage of data[0].stages) {
      avg.push({name: equiv(stage.name), time: get_avg(a[equiv(stage.name)])})
    }
    console.log("Session avg data", avg)
    return avg
  }, [data])

  return (
    <div className="App">

      <div className="tableContainer"
        style={{top: `${APP_TOP + y}px`, left: `${APP_LEFT + x}px`, transform: `scale(${sz})`, width: APP_WIDTH + margin.l + margin.r,
        height: APP_HEIGHT + margin.u + margin.d,
        backgroundColor: `rgba(0, 0, 0, ${a})`}}
      >
        <div style={{paddingLeft: margin.l + "px", paddingRight: margin.r + "px",
      paddingTop: margin.u + "px", paddingBottom: margin.d + "px"}}>
        <Table data={activeSolve} avg_data={avgSolve} time={displayTime} format={margin}></Table>

        <div className="cubeContainer">
            <CubeLoader counter={counter} data={activeSolve} time={currTime}></CubeLoader>
        </div>
        </div>
      </div>
      <div className="videoContainer">
      <video
                controls
                height={vh}
                width={vh * 1.8}
                ref={videoRef}
                // onTimeUpdate={this.handleVideoTimeUpdate}
      />
      </div>
      <div className="panelContainer">
      <div>
        <Button onClick={resetTime}> Replay current solve </Button>
      </div>

      <div style={{display: "flex"}}>

      <div>

        <div>
          <br></br>
          <Button onClick={() => setData(JSON.parse(dataText))}> Set data </Button>
          <textarea rows={10} cols={80}
            onChange={(e) => setDataText(e.target.value)}  value={dataText}
            />
        </div>
        <label>

        Upload video:
        <input type="file"
          onChange={(e: any) => {
            setVideo(e.target.files[0])
        }} />
        </label>
      </div>

      <div style={{display: "flex", flexWrap: "wrap"}}>
      <div>
      <label htmlFor='x'>x: {x} </label>
      <input type="range"
        min={0} max={2000} value={x} onChange={(e:any) => { setX(e.target.value) } }
      /></div>

      <div>
      <label>y: {y}</label>
      <input type="range"
            min={0} max={1000} value={y}
            onChange={(e: any) => { setY(e.target.value) }}
      />
      </div>

      <div>
      <label> Video height:{vh} </label>
      <input type="range"
min={400} max={1080} step={20} value={vh}
      onChange={(e:any) => { setVH(e.target.value) } }/>
      </div>
      <div>
      <label> Scale:{sz}</label>
      <input type="range"
min={0.1} max={2} value={sz} step={0.05}
      onChange={(e:any) => { setSz(e.target.value) } }/>
      </div>

      <div>
      <label> alpha:{a} </label>
      <input type="range"
min={0.1} max={1} value={a} step={0.1}
      onChange={(e:any) => { setA(e.target.value) } }/>
      </div>

      <div>
      <label> Padding left: {margin.l} </label>
      <input type="range"
min={0} max={400} value={margin.l} step={20} width={100}
      onChange={(e:any) => { setMargin({...margin, l:parseInt(e.target.value)}) } }/>
      </div>

      <div>
      <label> Padding right: {margin.r} </label>
      <input type="range"
min={0} max={400} value={margin.r} step={20} width={100}
      onChange={(e:any) => { setMargin({...margin, r:parseInt(e.target.value)}) } }/>
      </div>

      <div>
      <label> Padding Top: {margin.u} </label>
      <input type="range"
min={0} max={400} value={margin.u} step={20}
      onChange={(e:any) => { setMargin({...margin, u:parseInt(e.target.value)}) } }/>
      </div>

        <div>
      <label> Padding Bottom: {margin.d} </label>
      <input type="range"
min={0} max={400} value={margin.d} step={20}
      onChange={(e:any) => { setMargin({...margin, d:parseInt(e.target.value)}) } }/>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
