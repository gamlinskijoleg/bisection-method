"use client";

export const dynamic = "force-dynamic"; // ✅ tell Next.js to render runtime only

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/index.css";

interface Step {
	left: number;
	right: number;
	mid: number;
	fMid: number;
	error: number;
}

export default function StepsPage() {
	const searchParams = useSearchParams();
	const [stepsData, setStepsData] = useState<Step[]>([]);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const a = Number(searchParams.get("a"));
		const b = Number(searchParams.get("b"));
		const eps = Number(searchParams.get("eps"));

		if (isNaN(a) || isNaN(b) || isNaN(eps)) return;

		const f = (x: number) => x ** 3 - 11 * x - 19;

		const bisectionSteps = (func: (x: number) => number, a: number, b: number, eps: number) => {
			let left = a;
			let right = b;
			const stepsArr: Step[] = [];

			while (Math.abs(right - left) >= eps) {
				const mid = (left + right) / 2;
				const fMid = func(mid);
				const errorVal = (right - left) / 2;
				stepsArr.push({ left, right, mid, fMid, error: errorVal });

				if (func(left) * fMid <= 0) right = mid;
				else left = mid;
			}

			return stepsArr;
		};

		setStepsData(bisectionSteps(f, a, b, eps));
		setReady(true);
	}, [searchParams]);

	if (!ready) return <p>Loading...</p>;

	return (
		<div className="container ctn">
			<h1>Метод Бісекції: Кроки обчислень</h1>

			<div className="result">
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Крок</th>
								<th>Ліва межа</th>
								<th>Права межа</th>
								<th>Середина (mid)</th>
								<th>f(mid)</th>
								<th>Похибка</th>
							</tr>
						</thead>
						<tbody>
							{stepsData.map((step, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{step.left.toFixed(12)}</td>
									<td>{step.right.toFixed(12)}</td>
									<td>{step.mid.toFixed(12)}</td>
									<td>{step.fMid.toExponential(12)}</td>
									<td>{step.error.toExponential(12)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
