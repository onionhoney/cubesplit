import React from 'react';
import './Table.css';
import { Stage, StageAvg, Solve } from './Defs';
import { setAlgPartTypeMismatchReportingLevel } from 'cubing/dist/esm/src/alg';

type Format = {
    l: number;
    r: number;
}

export default function Table(props: { data: Solve, avg_data: StageAvg[], time: number, format: Format }) {
    let { data, avg_data, time, format } = props
    let curr_step = -1, tot_time = 0, tot_count = 0
    for (var i = 0; i < data.stages.length; i++) {
      tot_time += data.stages[i].time
      tot_count += data.stages[i].count
      if (time <= tot_time) {
        curr_step = i; break;
      }
    }
    let solved = time >= tot_time

    const format_delta = (time: number, avg_time: number) => {
      let delta_time = time - avg_time
      const eps = 1e-6;
      let percent = delta_time / (avg_time + eps)
      let delta_str = (delta_time < 0) ? "" : ("+");
      delta_str += delta_time.toFixed(2)

      let color
      if (percent < -0.1) {
        // very good, green
        color = "limegreen"
      } else if (percent < 0) {
        color = "yellow";
      } else if (percent < 0.1) {
        color = "white";
      } else {
        color = "red";
      }
      return [delta_str, color]
    }
    const aggregates = [
      {name: "FB", stages:  [0]},
      {name: "SB", stages:  [1, 2]},
      {name: "CMLL", stages: [3] },
      {name: "LSE", stages: [4, 5] }
    ]
    const metaAggregates = [
      {name: "F2B", stages: [0, 1, 2], span: 2},
      {name: "L10P", stages:  [3, 4, 5], span: 2},
    ]

    const aggr_row = ( desc: {name: string, stages: number[]}, i: number) => {
      let {name, stages} = desc
      // if it is done
      let curr_step_mod = curr_step
      if (solved) {
        curr_step_mod = data.stages.length;
      }
      let idx = stages.indexOf(curr_step_mod)
      let step_time : number | string = 0
      let delta_time, delta_color = "white"
      if (idx !== -1) {
        for (let i = 0; i < idx; i++) step_time += data.stages[ stages[i] ].time
        step_time += data.stages[curr_step_mod].time - (tot_time - time)
      } else if (stages[0] > curr_step_mod) {
        step_time = 0
      } else {
        let avg_time = 0
        for (let i = 0; i < stages.length; i++) {
          step_time += data.stages[ stages[i] ].time
          avg_time += avg_data[ stages[i] ].time
        }
        let res = format_delta(step_time , avg_time)
        delta_time = res[0]
        delta_color = res[1]
      }
      return {name, step_time, delta_color, delta_time}
    }

    const make_table = () => {
      let right_rows = aggregates.map(aggr_row)
      let left_rows = metaAggregates.map(aggr_row)
      let meta_idx = 0, meta_row = 0

      let make_right_row = (d : any, i: number) => {
        let {name, delta_color, delta_time, step_time} = d
        let meta_td = null
        if (i === meta_row) {
          const span = metaAggregates[meta_idx].span
          meta_row += meta_row + span
          meta_td = <td className="table-meta-td" rowSpan={span}>
            {left_rows[meta_idx].step_time.toFixed(2)}
          </td>
          meta_idx ++
        }
        return (
          <tr key={i}  className={ "inactive"}>
            <td className="table-name-td">
              {name} </td>
            <td className="table-delta-td" style={{color: delta_color}}> {delta_time} </td>
            <td className="table-time-td"> { (typeof step_time === "string") ? step_time : step_time.toFixed(2)} </td>

            {meta_td}
          </tr>
      )}

      return right_rows.map(make_right_row)
    }


    const make_empty_table = () => {
        let meta_idx = 0, meta_row = 0
      const empty_aggr_row = (desc: {name: string, stages: number[]}, i: number) => {
          let {name, stages} = desc
          let meta_td = null
          if (i === meta_row) {
            const span = metaAggregates[meta_idx].span
            meta_row += meta_row + span
            meta_td = <td className="table-meta-td" rowSpan={span}>
              -
            </td>
            meta_idx ++
          }
          return (
          <tr key={i}  className={ "inactive"}>
              <td className="table-name-td">
                  {name} </td>
              <td className="table-delta-td"> </td>
              <td className="table-time-td"> - </td>
              {meta_td}
          </tr>
          )
      }
      return aggregates.map(empty_aggr_row)
    }

    const row = (d: Stage, i: number) => {
      let delta_time
      let delta_color = "white"
      let step_time : string | number = -1
      if (i === curr_step) {
        step_time = d.time - (tot_time - time)
        delta_time = ""
      } else if (curr_step === -1 || i < curr_step) {
        step_time = d.time
        let res = format_delta(d.time , avg_data[i].time)
        delta_time = res[0]
        delta_color = res[1]
      } else {
        step_time = "";
        delta_time = ""
      }
      return (
        <div className="party" key={i} style={{backgroundColor: d.color}}>
           <div className="party-bar">
           <div className="party-name">
             {d.name}
          </div>
          <div className="party-stat" >
              {`${d.count} | ${d.time.toFixed(2)}s | ${(d.count / d.time).toFixed(2)}tps`}
          </div>
         </div>
          <div className="party-moves">
              {d.moves}
          </div>
        </div>
      )
    }

    const curr_stage = (curr_step ===-1 && tot_time + 15 > time) ? data.stages[data.stages.length - 1]
      : data.stages[curr_step]
    const current_stage = <div className="stageContainer">
        <div className="stageName"
            style={{backgroundColor: curr_stage?.color || "black"}}>
                {curr_stage?.name || ""}
        </div>
        <div className="stageMoves">{curr_stage?.moves || ""}</div>
    </div>

    const scramble_stage = <div className="stageContainer">
        <div className="stageName" style={{backgroundColor: "silver", fontSize: 30}}>
            Scramble
        </div>
        <div className="stageMoves">
            {data.scramble}
        </div>
    </div>

    const recap_stage = <div>
        {/* <table> <tbody> */}
        {data.stages.map(row)}
        {/* </tbody>
        </table> */}
    </div>

    //console.log(format)
    return (
       <div>
      <div className="table">
         {time < 0 ? scramble_stage : (false) ? recap_stage : current_stage}
      <table>
        <tbody>
        <tr> <td colSpan={4}> <hr></hr> </td> </tr>
        { (data.stages.length === 0 || time < 0) ?
          make_empty_table() :
          make_table() }
        </tbody>
        <tr> <td colSpan={4}> <hr></hr> </td> </tr>
      </table>
      <div>
        <div className="time"> {(time < 0 ? 0 : Math.min(time, tot_time)).toFixed(2)} </div>
      </div>
      <div>
        <div className="moves"> {solved && tot_count > 0? `${tot_count} ETM, ${(tot_count / tot_time).toFixed(2)} ETPS` :"" } </div>
      </div>
      <div>
      </div>
      </div>
      </div>
    )
  }