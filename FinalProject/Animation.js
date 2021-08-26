import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"


export class Astronaut {
    joints = [];
    animations = {};

    constructor(){
//      COPUTE ANIMATIONS:
        Data.astronaut.animation.forEach(clip, key) => {
            let animation = new Animation(key, this.joints, clip.frames, clip.periods);
            this.animations[key] = animation;
        }
    }

    set joints(list){
        this._joints = list;
    }

}

export class Animation{
    playing = false;
    paused = false;
    group = new TWEEN.Group();
    constructor(name, joints, frames, periods) {
        this.name = name;
        let tweens = [];
        const c = Math.PI/180;
        for (let i = 0; i<joints.length; i++){
            let firstTween, currentTween;
            for (let j = 0; j < frames[0].length; j++){
                const tween = new TWEEN.Tween(joints[i],this.group).to(frames[i][j],periods[j]);
                if (j==0) firstTween = tween;
                else currentTween.chain(tween);
                currentTween = tween;
            }
            currentTween.chain(firstTween);
            tweens.push(firstTween);
        }
        this.tweens = tweens;
    }

    Start() {
        if(!this.playing){
            this.playing = true;
            this.tweens.forEach((tween) => tween.start());
        }
    }

    Stop() {
        if(this.playing){
            this.playing = false;
            this.group.getAll().forEach((tween) => tween.stop());
        }
    }

    Update(time){
        // console.log(time)
        // if(time>4000) this.Stop();
        this.group.update();
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
