import React from "react";
export default function App() {
  type Point = { x: number; y: number };
  const [clicks, setClicks] = React.useState<Point[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      console.info("canvas ref not avalable");
      return;
    }

    draw(canvasRef.current!, clicks);
  }, [canvasRef.current, clicks]);
  const draw = (c: HTMLCanvasElement, points: Point[]) => {
    if (points.length < 3) {
      console.log("fewer than 3 points");
      return;
    }
    let ctx = c.getContext("2d")!;
    let [p1, p2, p3] = points;
    var diffX = p1.x - p2.x,
      diffY = p1.y - p2.y,
      radius = Math.abs(Math.sqrt(diffX * diffX + diffY * diffY)),
      startAngle = Math.atan2(diffY, diffX),
      endAngle = Math.atan2(p3.y - p2.y, p3.x - p2.x);

    // arc
    ctx.arc(p2.x, p2.y, radius, startAngle, endAngle, false);
    ctx.stroke();

    // points / lines helpers:
    ctx.fillRect(p1.x - 2, p1.y - 2, 4, 4);
    ctx.fillRect(p2.x - 2, p2.y - 2, 4, 4);
    ctx.fillRect(p3.x - 2, p3.y - 2, 4, 4);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.x);
    ctx.lineTo(p3.x, p3.x);
    ctx.strokeStyle = "#999";
    ctx.stroke();
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 100 }}
        />
        <img
          src="/baseball-diamond-with-positions.gif"
          onClick={(e) => {
            let { clientX, clientY } = e;
            let self: HTMLImageElement = e.nativeEvent
              .target! as HTMLImageElement;
            let { x, y } = self;
            let imgRelX = clientX - x;
            let imgRelY = clientY - y;
            setClicks([...clicks, { x: imgRelX, y: imgRelY } as Point]);
            console.log({ x, y, clientX, clientY }, e);
          }}
        />
      </div>
      {clicks.map((c: any) => (
        <pre>{JSON.stringify(c, null, 2)}</pre>
      ))}
    </div>
  );
}
