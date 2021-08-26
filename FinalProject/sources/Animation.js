class Animation{
    playing = false;
    constructor(name, joints, frames, periods) {
        this.name = name;
        this.joints = Joints;
        this.nFrames = Frames[0].length;
        this.tweens = new TWEEN.Group();
        Tweens();

        function Tweens(){
            const c = Math.PI/180;
            for (let i = 0; i<joints.length; i++){
                let firstTween, currentTween;
                for (let j = 0; j < nFrames; j++){
                    const tween = new TWEEN.Tween(joints[i]).to(frames[i][j],periods[j]);
                    if (j==0) firstTween = tween;
                    else currentTween.chain(tween);
                    currentTween = tween;
                }
                currentTween.chain(firstTween);
                this.tweens.add(firstTween);
            }

            return tweens;
        }
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
