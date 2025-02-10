"use client";

import dynamic from "next/dynamic"
import React from "react"


function Hello() {
  type Circle = {
    type: 'Circle',
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  }

  type Line = {
    type: 'Line',
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  }

  type Text = {
    type: 'Text',
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    txt: string
  }

  type Annotation = Circle | Line | Text

  type Comment = {
    circle: Circle
    line: Line
    text: Text
  }

  function getComments(annotations: Annotation[]): Comment[] {

    // separate circle,line,text from annotations
    const lines = annotations.filter(item => item.type === 'Line')
    const circles = annotations.filter(item => item.type === 'Circle')
    const texts = annotations.filter(item => item.type === 'Text')

    // loop each line ==> x or y (same)
    lines.map((line, lineId) => {

      // console.log(line)

      // find nearest circle
      const distanceLinesAndCircles = circles.map((circle, circleId) => {
        const isBottomLeftDirection =  line.y1 === circle.y2 && line.x1 > circle.x1 && line.x1 < circle.x2
        const isBottomRightDirection = line.y2 === circle.y2 && line.x2 > circle.x1 && line.x2 < circle.x2
        
        const isTopLeftDirection = line.y1 === circle.y1 && line.x1 > circle.x1 && line.x1 < circle.x2
        const isTopRightDirection = line.y2 === circle.y1 && line.x2 > circle.x1 && line.x2 < circle.x2

        const isLeftLeftDirection = line.x1 === circle.x1 && line.y1 < circle.y1 && line.y2 > circle.y2
        const isLeftRightDirection = line.x2 === circle.x1 && line.y2 < circle.y1 && line.y2 > circle.y2

        const isRightLeftDirection = line.x1 === circle.x2 && line.y1 < circle.y1 && line.y1 > circle.y2
        const isRightRightDirection =  line.x2 === circle.x2 && line.y2 < circle.y1 && line.y2 > circle.y2

        return {
          lineId: lineId,
          circleId: circleId,
          isBottomLeftDirection,
          isBottomRightDirection,
          isLeftLeftDirection,
          isLeftRightDirection,
          isRightLeftDirection,
          isRightRightDirection,
          isTopLeftDirection,
          isTopRightDirection,
          line: line,
          circle: circle,
        }
      })

      const nearestCircle = distanceLinesAndCircles.find(data => {
        return Object.values(data).includes(true)
      })

      // console.log(nearestCircle)

      if (nearestCircle) {
        const distanceLinesAndText = texts.map((text, textId) => {

          const isBottomLeftDirection =  nearestCircle.line.y1 === text.y2 && nearestCircle.line.x1 > text.x1 && nearestCircle.line.x1 < text.x2
          const isBottomRightDirection = nearestCircle.line.y1 === text.y2 && nearestCircle.line.x2 > text.x1 && nearestCircle.line.x2 < text.x2
          
          const isTopLeftDirection = nearestCircle.line.y1 === text.y1 && nearestCircle.line.x1 > text.x1 && nearestCircle.line.x1 < text.x2
          const isTopRightDirection = nearestCircle.line.y2 === text.y1 && nearestCircle.line.x2 > text.x1 && nearestCircle.line.x2 < text.x2
  
          const isLeftLeftDirection = nearestCircle.line.x1 === text.x1 && nearestCircle.line.y1 < text.y1 && nearestCircle.line.y2 > text.y2
          const isLeftRightDirection = nearestCircle.line.x2 === text.x1 && nearestCircle.line.y2 < text.y1 && nearestCircle.line.y2 > text.y2
  
          const isRightLeftDirection = nearestCircle.line.x1 === text.x2 && nearestCircle.line.y1 < text.y1 && nearestCircle.line.y1 > text.y2
          const isRightRightDirection =  nearestCircle.line.x2 === text.x2 && nearestCircle.line.y2 < text.y1 && nearestCircle.line.y2 > text.y2
  
          return {
            lineId: lineId,
            circleId: nearestCircle.circleId,
            textId: textId,
            isBottomLeftDirection,
            isBottomRightDirection,
            isLeftLeftDirection,
            isLeftRightDirection,
            isRightLeftDirection,
            isRightRightDirection,
            isTopLeftDirection,
            isTopRightDirection,
            line: nearestCircle.line,
            circle: nearestCircle.circle,
            text: text
          }
        })

        const nearestText = distanceLinesAndText.find(data => {
          return Object.values(data).includes(true)
        })
        
        if (nearestText) {
          const comment = {
            line: nearestText.line,
            circle: nearestText.circle,
            text: nearestText.text,
          }

          console.log(comment)
        }
      }
    })
  }

  const examplesData: Annotation[] = [
    { type: 'Line', x1: 20, y1: 20, x2: 25, y2: 40},
    { type: 'Circle', x1: 10, y1: 60, x2: 30, y2: 40},
    { type: 'Text', x1: 0, y1: 20, x2: 30, y2: 0, txt: 'Hello world'},
  
    { type: 'Line', x1: 130, y1: 10, x2: 150, y2: 20},
    { type: 'Circle', x1: 150, y1: 60, x2: 200, y2: 10},
    { type: 'Text', x1: 100, y1: 20, x2: 130, y2: 0, txt: 'Text2'},

    { type: 'Line', x1: 30, y1: 100, x2: 50, y2: 80},
    { type: 'Circle', x1: 40, y1: 80, x2: 60, y2: 70},
    { type: 'Text', x1: 0, y1: 120, x2: 30, y2: 90, txt: 'KKKKA'},

    { type: 'Line', x1: 80, y1: 120, x2: 85, y2: 150},
    { type: 'Circle', x1: 75, y1: 180, x2: 100, y2: 150},
    { type: 'Text', x1: 70, y1: 120, x2: 100, y2: 100, txt: 'dsada'},
  ]



  getComments(examplesData)


  return (
    <div>123</div>
  );
}

export default dynamic(() => Promise.resolve(Hello), {
  ssr: false
})