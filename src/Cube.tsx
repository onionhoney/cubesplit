import './Cube.css';
import './Twisty.css';
import React, { useEffect } from 'react'
import { algToString, invert, parse, Sequence, BlockMove } from "cubing/alg";
import { Twisty } from "cubing/twisty";


let c_event = new CustomEvent("moves",{detail: 3});

export type Timeline = {
    move: BlockMove,
    timeStamp: number
}
function scrambleFor(s : Timeline[]) {
    let arr : BlockMove[] = []
    for (let t of s) { arr.push(t.move) }
    const seq = new Sequence(arr)
    return invert(seq)
}


export default function Cube(props: {timelineSeq: Timeline[], counter: number, scramble: string}) {
    const twisty_ref = React.useRef(null)
    const [twisty, setTwisty] = React.useState<Twisty|null>(null)
    const queue = React.useRef<Timeline[]>([])

    React.useEffect( () => {
        const twisty2 =
            new Twisty(twisty_ref.current!, { alg: new Sequence([]) })
        console.log("New twisty2")
        setTwisty(twisty2)
    }, [])
    React.useEffect( () => {
        if (twisty === null) return
        twisty!.experimentalSetAlg(parse(props.scramble))// ? scrambleFor(props.timelineSeq))
        //if (movSeq && movSeq.nestedUnits.length > 0) {
        queue.current = []
        for (let timeline of props.timelineSeq) {
            queue.current.push(timeline)
        }
        let now : number | null = null
        const tick = () => {
            const bm = queue.current[0]
            if (now === null) now = Date.now()
            if (twisty && bm) {
                let time_elapsed = Date.now() - now
                if (time_elapsed >= bm.timeStamp) {
                    queue.current.shift()
                    const bm_next = queue.current[0]
                    if (bm_next) {
                        twisty!.experimentalAddMove(bm.move, Math.min(200, bm_next.timeStamp - bm.timeStamp))
                        //id = setTimeout(tick, bm_next.timeStamp - bm.timeStamp)
                    } else {
                        twisty!.experimentalAddMove(bm.move, 300)
                    }
                }
            }
        }
        let id = setInterval(tick, 20);
        return () => clearInterval(id);
    }, [twisty, props.counter] )

    return <div>
        <div className="twisty" ref={twisty_ref}> </div>
        {/* {twisty_obj ? twisty_obj.element : null} */}
    </div>
}