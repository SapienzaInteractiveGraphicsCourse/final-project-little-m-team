//import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"
import {Data} from "./Data.js"

export class Player {
    joints = [];
    animations = {};

    constructor(obj){
        this.name = obj.name;

//      COMPUTE JOINTS:
        Data.astronaut.joints.forEach((item, i) => {
            if (!i) this.joints.push(obj.getObjectById(item).position)
            else this.joints.push(obj.getObjectById(item).rotation)
        });

//      COMPUTE ANIMATIONS:
        for (const [name, clip] of Object.entries(Data.astronaut.animations)) {
            const animation = new Animation(name, this.joints, clip.frames, clip.periods, clip.repeat);
            this.animations[name] = animation;
        }
    }

    update() {
        for (const [name, clip] of Object.entries(this.animations)) {
            if(clip.playing) clip.Update();
        }
    }

    move(){
        this.animations.Walk.Start();
    }
    reset(){
        this.animations.Walk.Stop();
        this.animations.Reset.playing = false;
        this.animations.Reset.setTweens();
        this.animations.Reset.Start();
    }
}

export class Animation{
    playing = false;
    paused = false;
    group = new TWEEN.Group();
    tweens = [];
    constructor(name, joints, frames, periods, repeat) {
        this.name = name;
        this.repeated = repeat;
        this.joints = joints;
        this.frames = frames;
        this.periods = periods;
        this.setTweens();
    }
    setTweens(){
        this.group.removeAll();
        let tweens = [];
        const c = Math.PI/180;
        for (let i = 0; i<this.joints.length; i++){
            let firstTween, currentTween;
            for (let j = 0; j < this.frames[0].length; j++){
                const tween = new TWEEN.Tween(this.joints[i],this.group).to(this.frames[i][j],this.periods[j]);
                if (j==0) firstTween = tween;
                else currentTween.chain(tween);
                currentTween = tween;
            }
            if (this.repeat) currentTween.chain(firstTween);
            tweens.push(firstTween);
        }
        this.tweens = tweens;
    }

    Start() {
        if(!this.playing){
            this.playing = true;
            this.tweens.forEach((tween) => {
                tween.start();
            });
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
