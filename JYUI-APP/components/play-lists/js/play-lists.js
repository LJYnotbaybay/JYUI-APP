/**
 *  @LiuJiaYu
 * @param {*} o 
 */

function createPlayLists(o={}){
    
    this.init_play_lists = function (){
        this.set_o(o);
        this.setout();
        this.createBox();
    }

    this.set_o = function (o){
        this.el = 'el' in o ? o.el : console.error('cannot find el');
    }

    this.setout = function (){
        this.element = document.querySelector(this.el);
        this.width = document.querySelector(this.el).offsetWidth;
        this.height = document.querySelector(this.el).offsetHeight;
    }

    this.createBox = function (){
        
        this.play_lists_box = document.createElement('div')
        this.play_lists_view = document.createElement('div')
        this.play_left_btn = document.createElement('div')
        this.play_right_btn = document.createElement('div')
        this.play_top_btn = document.createElement('div')
        this.play_bommon_btn = document.createElement('div')
        this.play_lists_box.style.width = '100%';
        this.play_lists_box.style.height = '100%';
        this.play_lists_box.style.position = 'relative';
        this.element.innerHTML = this.play_lists_box.outerHTML;
        this.play_lists_view.style = {
            width:'80%',
            height:'90px',
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate("-50%","-50%")'
        }
        // boxStyle.width = '80%';
        // boxStyle.height = '90%';
        // boxStyle.position = 'absolute';
        // boxStyle.top = '50%';
        // boxStyle.left = '50%';
        // boxStyle.transform = 'translate("-50%","-50%")'
        
    }

    this.init_play_lists();
}
window.onload = function () {
    
    new createPlayLists({
        el:'#demo-el-A'
    })
}
