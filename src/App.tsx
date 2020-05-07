import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Cube, { Timeline } from './Cube';
import Table from './Table';
import { parse, Sequence, BlockMove } from "cubing/alg";
import { Stage, StageAvg, Solve } from './Defs';


const PREAMBLE = 5.0
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



const avg_solve : StageAvg[] = [
  {name: "FB", time: 1.16},
  {name: "SS", time: 1.67},
  {name: "SP", time: 0.33},
  {name: "CMLL", time: 1.57},
  {name: "EOLRb", time: 1.17},
  {name: "EP", time: 0.75},
]

const solve1 : Stage[] = [
  {name: "FB", color: "darkseagreen", moves: "z' R' U F' U R U' M' f' z", time: 2.27, count: 10},
  {name: "SS", color: "orange", moves: "R U R' U2' R r U R'", time: 1.48, count: 8},
  {name: "SP", color: "#f2cd05", moves: " U' M2' U2' r' U' R", time: 1.30, count: 6},
  {name: "CMLL", color: "steelblue", moves: "R U R' U' R' F R R U' R' U' R U R' F'", time: 2.31, count: 15},
  {name: "EOLRb", color: "mediumpurple", moves: "U' M U2' M' U' U' M2'", time: 1.53, count: 7},
  {name: "EP", color: "indianred", moves: " U M' U2' M U2' ", time: 1.00, count: 5 }
]

const emptySolve : Solve = {
  starting_time: 0,
  stages: [
    // {"name": "FB", time: 0.00, color: "", count: 0, moves: ""},
    // {"name": "SS", time: 0.00, color: "", count: 0, moves: ""},
    // {"name": "SP", time: 0.00, color: "", count: 0, moves: ""},
    // {"name": "CMLL", time: 0.00, color: "", count: 0, moves: ""},
    // {"name": "EOLRb", time: 0.00, color: "", count: 0, moves: ""},
    // {"name": "EP", time: 0.00, color: "", count: 0, moves: ""},
  ],
  scramble: ""
}

const solve2 : Stage[] = [
  { "name": "FB", "color": "#8b69db", "moves": "l r U' x' D2' r' F'", "time": 1.16666666666667, "count": 7 },{ "name": "SS", "color": "#69bddb", "moves": "R2 U M' U R U' r U r' U' r2", "time": 2, "count": 11 }, { "name": "SP", "color": "#699adb", "moves": "U' R'", "time": 0.2, "count": 2 }, { "name": "CMLL", "color": "#69db73", "moves": "M' L' U' L U' L' U L U' L' U L U' L' U2 L", "time": 1.56666666666667, "count": 16 }, { "name": "EOLRb", "color": "#db9169", "moves": "U' M' U2' M' U2' M U' M' U2' M2'", "time": 1.1, "count": 10 }, { "name": "EP", "color": "#d15e5e", "moves": "U' M' U2' M' U2' M2'", "time": 0.746666666666667, "count": 6 }
]


const solves : Solve[] = [
  {
  "stages":
    [{"name":"FB","color":"#8b69db","moves":"l r U' x' D2' r' F'","time":1.16666666666667,"count":7},{"name":"SS","color":"#69bddb","moves":"R2 U M' U R U' r U r' U' r2","time":2,"count":11},{"name":"SP","color":"#699adb","moves":"U' R'","time":0.2,"count":2},{"name":"CMLL","color":"#69db73","moves":"M' L' U' L U' L' U L U' L' U L U' L' U2 L","time":1.56666666666667,"count":16},{"name":"EOLRb","color":"#db9169","moves":"U' M' U2' M' U2' M U' M' U2' M2'","time":1.1,"count":10},{"name":"EP","color":"#d15e5e","moves":"U' M' U2' M' U2' M2'","time":0.746666666666667,"count":6}] ,
  starting_time:530/30,
  scramble:"D' F2 L2 U F2 U B2 L2 B2 F2 U' F' D' R F' L B L F2 D2 B' y"
  },
  {"stages":[{"name":"FB","color":"#8b69db","moves":"U' R' u U M' U' R B'","time":1.06666666666667,"count":8},{"name":"SS","color":"#69bddb","moves":"U R U' R' U2' r U r'","time":1.8,"count":8},{"name":"SP","color":"#699adb","moves":"U R' U2' R","time":0.4,"count":4},{"name":"CMLL","color":"#69db73","moves":"M' U2 R U2' R2' F R F' U2' R' F R F'","time":1.56666666666667,"count":13},{"name":"EOLRb","color":"#db9169","moves":"U' M U' M' U M' U2' M'","time":1.03333333333333,"count":8},{"name":"EP","color":"#d15e5e","moves":"U' M2' U2' M U2' M'","time":0.723333333333334,"count":6}],starting_time:1300/30,scramble:"R2 U' R2 B2 L2 U R2 D B2 D B' L' U' B U' L F L F2 U' L2 y2"},
  {"stages":[{"name":"FB","color":"#8b69db","moves":"D' L' U2 L' D' R2 U R' U F'","time":1.56666666666667,"count":10},{"name":"SS","color":"#69bddb","moves":"U R U R U R2'","time":1.23333333333333,"count":6},{"name":"SP","color":"#699adb","moves":"U r","time":0.266666666666667,"count":2},{"name":"CMLL","color":"#69db73","moves":"U2' R' F R U F U' R U R' U' F'","time":1.4,"count":12},{"name":"EOFBb","color":"#db9169","moves":"U2' M'","time":0.533333333333333,"count":2},{"name":"EP","color":"#d15e5e","moves":"U' M' U2' M U2' M' U'","time":0.76,"count":7}],starting_time:2038/30,scramble:"L2 B2 U2 R2 B2 R2 U L2 D2 U B2 F L D2 U2 L' B U' F' R' D' z y"},
  {"stages":[{"name":"FB","color":"#8b69db","moves":"u r' B' r' F r F'","time":1.23333333333333,"count":7},{"name":"SS","color":"#69bddb","moves":"U' R' U R U R' U2' R2","time":1.2,"count":8},{"name":"SP","color":"#699adb","moves":"U2' M' U' r'","time":0.4,"count":4},{"name":"CMLL","color":"#69db73","moves":"U2' F R' F' R U2 R U2' R'","time":1.56666666666667,"count":9},{"name":"EOLRb","color":"#db9169","moves":"M' U' M' U' M U' M' U' M2' U2' M2'","time":1.36666666666667,"count":11},{"name":"EP","color":"#d15e5e","moves":"U M' U2' M2' U2' M' U2' M2'","time":0.793333333333332,"count":8}],starting_time:2668/30,scramble:"D L2 F2 R2 D B2 D R2 D' U2 L2 F' D' L' D2 B' U F R B z y2"}
]

const solve = solve2

const APP_WIDTH = 300, APP_HEIGHT = 720

function App() {
  const [currTime, setCurrTime ] = React.useState(25)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [x, setX] = React.useState(20)
  const [a, setA] = React.useState(0.9)
  const [margin, setMargin]= React.useState({l: 10, r:10, u: 10, d:20})
  const [y, setY] = React.useState(1)
  const [vh, setVH] = React.useState(900)
  const [sz, setSz] = React.useState(1.2)

  const [offsetText, setOffsetText] = React.useState("")
  const [offset, setOffset] = React.useState(0)
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

  const active_solve = data.filter((s: Solve, i: number) => {
     return s.starting_time - PREAMBLE <= currTime
  }).pop() || emptySolve

  // const active_solve_time = React.useMemo(() => {
  //   if (active_solve) {
  //     return active_solve.stages.map(x => x.time).reduce((x, y) => x + y, 0)
  //   } else return 0
  // }, [active_solve])

  useEffect( () => {
    incrCounter(counter + 1)
  }, [active_solve] )

  const displayTime = active_solve ? (currTime - active_solve.starting_time) : 0

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


  return (
    <div className="App">

      <div className="tableContainer"
        style={{top: `${y}px`, left: `${x}px`, transform: `scale(${sz})`, width: APP_WIDTH + margin.l + margin.r,
        height: APP_HEIGHT + margin.u + margin.d,
        backgroundColor: `rgba(0, 0, 0, ${a})`}}
      >
        <div style={{paddingLeft: margin.l + "px", paddingRight: margin.r + "px",
      paddingTop: margin.u + "px", paddingBottom: margin.d + "px"}}>
        <Table data={active_solve} avg_data={avg_solve} time={displayTime} format={margin}></Table>

        <div className="cubeContainer">
            <CubeLoader counter={counter} data={active_solve} time={currTime}></CubeLoader>
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
        <button onClick={resetTime}> Replay current solve </button>

      </div>
      <div>

      <div>
{/*
        <button onClick={() => setOffset(parseInt(offsetText))}> Set offset </button>
        <input onChange={(e) => setOffsetText(e.target.value)} value={offsetText}/> */}

        <br></br>

        <button onClick={() => setData(JSON.parse(dataText))}> Set data </button>
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
      <div>
      <input type="range" min={0} max={2000} value={x}
      onChange={(e:any) => { setX(e.target.value) } }></input>
      x:{x}

      <input type="range" min={0} max={1000} value={y}
      onChange={(e:any) => { setY(e.target.value) } }></input>
      y:{y}

      <input type="range" min={700} max={1080} step={20} value={vh}
      onChange={(e:any) => { setVH(e.target.value) } }></input>
      video_h:{vh}

      <input type="range" min={0.1} max={2} value={sz} step={0.1}
      onChange={(e:any) => { setSz(e.target.value) } }></input>
      Size:{sz}

      <input type="range" min={0.1} max={1} value={a} step={0.1}
      onChange={(e:any) => { setA(e.target.value) } }></input>
      alpha:{a}

      <input type="range" min={0} max={400} value={margin.l} step={20}
      onChange={(e:any) => { setMargin({...margin, l:parseInt(e.target.value)}) } }></input>
      Left Padding:{margin.l}

      <input type="range" min={0} max={400} value={margin.r} step={20}
      onChange={(e:any) => { setMargin({...margin, r:parseInt(e.target.value)}) } }></input>
      Right padding:{margin.r}

      <input type="range" min={0} max={400} value={margin.u} step={20}
      onChange={(e:any) => { setMargin({...margin, u:parseInt(e.target.value)}) } }></input>
      Top padding:{margin.u}

      <input type="range" min={0} max={400} value={margin.d} step={20}
      onChange={(e:any) => { setMargin({...margin, d:parseInt(e.target.value)}) } }></input>
      Bottom padding:{margin.d}
      </div>
      </div>
    </div>
  );
}

export default App;
