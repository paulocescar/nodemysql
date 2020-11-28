import $ from 'jquery';
import Popper from 'popper.js';
import createImage from './images.js';

export default function photo(){
    $('input[type=file]').on('change',function(e){
        if(e !== undefined || e !== null || e !== ''){
            $('#thumbnail'+e.target.id).attr('class','hasThumbnail thumb')
            $('#thumbnail'+e.target.id).attr('style','background-Image: url("'+URL.createObjectURL(e.target.files[0])+'")')
            createImage()
            console.log(e)
        }
    })
}