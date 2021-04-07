import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
// import ReactPlayer from 'react-player'
import { DotsGroup } from './dots-group';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './carousel.scss';

class Carousel extends Component {

    constructor() {
        super();
        this.state = {
          width: 0,
          height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);  
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        console.log('window.innerHeight: ', window.innerHeight)
        console.log('window.innerWidth: ', window.innerWidth)
      }

    render(){
        return (
            <CarouselProvider
                naturalSlideWidth={this.state.width}
                naturalSlideHeight={this.state.height}
                totalSlides={2}
                infinite="true"
                orientation="vertical"
                isPlaying={true}
                interval={31500}
            >
                <Slider>
                    {/* <Slide index={0}><ReactPlayer url='img/NordFest.mp4' width='100%' height='100%' playing loop /></Slide> */}
                    <Slide index={0}><Image src="img/slide1.png" /></Slide>
                    <Slide index={1}><video loop autoPlay muted type='video/mp4' src='img/NordFest.mp4' media='(min-device-pixel-ratio:2), (-webkit-min-device-pixel-ratio:2), (min--moz-device-pixel-ratio:2), (-o-min-device-pixel-ratio:2)'></video></Slide>
                    {/*<Slide index={2}><Image src="img/slide2.png" /></Slide>*/}
                </Slider>
                {<DotsGroup />}
            </CarouselProvider>
        )
    }
};

export default Carousel;
