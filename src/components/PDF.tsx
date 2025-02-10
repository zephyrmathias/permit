'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
	
		if (typeof window !== 'undefined') {
		  import('pspdfkit').then((PSPDFKit) => {

			if (PSPDFKit) {
			  PSPDFKit.unload(container);
			}
	
			PSPDFKit.load({
			  container,
			  document: '/files/interview_permit_pdf.pdf',
			  baseUrl: `${window.location.protocol}//${window.location.host}/`,
			}).then(async (instance) => {
        const pagesAnnotations = await Promise.all(
          Array.from({
            length: instance.totalPageCount
          }).map((_, pageIndex) => instance.getAnnotations(pageIndex))
        );
      
        const allAnnotations = pagesAnnotations
          .map((pageList) => pageList.toJS())
          .flat();

        const lines = allAnnotations.filter(annotation => {
          return !!annotation.startPoint && !!annotation.endPoint
        }).map(annotation => {
          const x = annotation.startPoint.x < annotation.endPoint.x ? { x1: annotation.startPoint.x, x2: annotation.endPoint.x } : { x1: annotation.endPoint.x, x2: annotation.startPoint.x }
          const y = annotation.startPoint.y > annotation.endPoint.y ? { y1: annotation.startPoint.y, y2: annotation.endPoint.y} : { y1: annotation.endPoint.y, y2: annotation.startPoint.y}

          return { id: annotation.id, x1: x.x1, y1:y.y1, x2: x.x2, y2: y.y2, type: 'Line' }
        })

        const texts = allAnnotations.filter(annotation => {
          return !!annotation.text
        }).map(annotation => {
          return { id: annotation.id, x1: annotation.boundingBox.left, y1: annotation.boundingBox.top, x2: annotation.boundingBox.left + annotation.boundingBox.width, y2: annotation.boundingBox.top - annotation.boundingBox.height, txt: annotation.text.value, type: 'Text' }
        })

        const circles = allAnnotations.filter(annotation => {
          return !annotation.text && !annotation.startPoint && !annotation.endpoint
        }).map(annotation => {
          return { id: annotation.id, x1: annotation.boundingBox.left, y1: annotation.boundingBox.top, x2: annotation.boundingBox.left + annotation.boundingBox.width, y2: annotation.boundingBox.top - annotation.boundingBox.height, type: 'Circle' }
        })

        // console.log(lines)
        // console.log(texts)
        // console.log(circles)

        // console.log(allAnnotations)

        console.log([...lines, ...circles, ...texts])
      });
    });
		}
	  }, []);

	return <div ref={containerRef} style={{ height: '100vh' }} />;
}