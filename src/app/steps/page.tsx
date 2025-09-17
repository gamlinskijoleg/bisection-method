"use client";

import { useSearchParams } from "next/navigation";
import "@/app/index.css"

export default function StepsPage() {
	const searchParams = useSearchParams();

	const a = Number(searchParams!.get("a"));
	const b = Number(searchParams!.get("b"));
	const eps = Number(searchParams!.get("eps"));

	const f = (x: number) => x ** 3 - 11 * x - 19;

	const bisectionSteps = (func: (x: number) => number, a: number, b: number, eps: number) => {
		let left = a;
		let right = b;
		const stepsArr: { left: number; right: number; mid: number; fMid: number; error: number }[] = [];

		while (Math.abs(right - left) >= eps) {
			const mid = (left + right) / 2;
			const fMid = func(mid);
			const errorVal = (right - left) / 2;
			stepsArr.push({ left, right, mid, fMid, error: errorVal });

			if (func(left) * fMid <= 0) {
				right = mid;
			} else {
				left = mid;
			}
		}

		return stepsArr;
	};

	const stepsData = bisectionSteps(f, a, b, eps);

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
