"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./index.css";

export default function HomePage() {
	const [a, setA] = useState<number | "">("");
	const [b, setB] = useState<number | "">("");
	const [eps, setEps] = useState<number | "">("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (a === "" || b === "" || eps === "") {
			alert("Всі поля повинні бути заповнені!");
			return;
		}

		if (a >= b) {
			alert("Ліва межа A повинна бути менша за праву межу B!");
			return;
		}

		if (eps <= 0) {
			alert("Похибка ε повинна бути більшою за нуль!");
			return;
		}

		router.push(`/steps?a=${a}&b=${b}&eps=${eps}`);
	};

	return (
		<div className="container">
			<h1>Метод Бісекції</h1>

			<form className="form" onSubmit={handleSubmit}>
				<label>
					A (ліва межа)
					<input type="number" value={a} onChange={(e) => setA(e.target.value === "" ? "" : Number(e.target.value))} placeholder="-10" />
				</label>
				<label>
					B (права межа)
					<input type="number" value={b} onChange={(e) => setB(e.target.value === "" ? "" : Number(e.target.value))} placeholder="10" />
				</label>
				<label>
					Похибка (ε)
					<input type="number" value={eps} onChange={(e) => setEps(e.target.value === "" ? "" : Number(e.target.value))} placeholder="0.00001" step="any" />
				</label>
				<button type="submit">Обчислити кроки</button>
			</form>
		</div>
	);
}
