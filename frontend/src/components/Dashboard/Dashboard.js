import React from 'react'
import { Slider, Slide, Caption, Footer } from 'react-materialize'

// components 
// import CourtPicker from './CourtPicker'

const Dashboard = () => {

    return (
        <div>

        <div className="container">
        <br/>
        <br/>
        <br/>
            <Slider
                fullscreen={false}
                options={{
                    duration: 500,
                    height: 400,
                    indicators: true,
                    interval: 6000
                }}
                >
                <Slide image={<img alt="" src="https://d24lqeczfu7s1y.cloudfront.net/venue/meadowbank-park-tc/9c4dbe3c-7d0f-477b-bd74-719b8e90b437.jpg"/>}>
                    <Caption placement="center">
                    <h3>
                        Welcome to Courts
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        To book a court, sign in above.
                    </h5>
                    </Caption>
                </Slide>
                <Slide image={<img alt="" src="https://d24lqeczfu7s1y.cloudfront.net/venue/meadowbank-park-tc/34c340d8-c2b3-45b7-a1a4-71f3b2854d1e.jpg"/>}>
                    <Caption placement="left">
                    <h3>
                        Accessible
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        AAA
                    </h5>
                    </Caption>
                </Slide>
                <Slide image={<img alt="" src="https://d24lqeczfu7s1y.cloudfront.net/venue/meadowbank-park-tc/09bb834f-a648-481d-b299-5410004298c6.jpg"/>}>
                    <Caption placement="right">
                    <h3>
                        Affordable
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        AAA
                    </h5>
                    </Caption>
                </Slide>
                <Slide image={<img alt="" src="https://images.unsplash.com/photo-1593838957161-7b18571c8c83?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"/>}>
                    <Caption placement="center">
                    <h3>
                        Achievable
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        AAA
                    </h5>
                    </Caption>
                </Slide>
            </Slider>    
            </div>
        </div>
    )
}

export default Dashboard