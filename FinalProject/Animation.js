import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"

export class Animation{
    playing = false;
    constructor(name, joints, frames, periods) {
        this.name = name;
        this.tweens = Tweens();
        function Tweens() {
            const tweens = new TWEEN.Group();
            const c = Math.PI/180;
            for (let i = 0; i<joints.length; i++){
                let firstTween, currentTween;
                for (let j = 0; j < frames[0].length; j++){
                    const tween = new TWEEN.Tween(joints[i]).to(frames[i][j],periods[j]);
                    if (j==0) firstTween = tween;
                    else currentTween.chain(tween);
                    currentTween = tween;
                }
                currentTween.chain(firstTween);
                tweens.add(firstTween);
            }
            return tweens;
        };
    }

    Start() {
        if (!this.playing) {
            this.tweens.getAll().forEach((tween) => tween.start());
            this.playing = true;
        }
    }

    Stop() {
        if (this.playing) {
            this.tweens.getAll().forEach((tween) => tween.stop());
            this.playing = false;
        }    }

    Update(){
        this.tweens.update();
    }
}


//GARBAGE COLLECTION:
// Old setTweens() Funcition:
// function setTweens(){
//     let tweens = [];
//     for (let i = 0; i<joints.length; i++){
//         let sequence = [];
//         for (let j = 0; j < nFrames; j++){
//             const tween = new TWEEN.Tween(joints[i]).to(frames[i][j],t);
//             sequence.push(tween);
//             if (j>0) sequence[j-1].chain(tween);
//         }
//         sequence[nFrames-1].chain(sequence[0]);
//         tweens.push(sequence[0]);
//     }
//     return tweens;
// }