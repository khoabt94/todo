"use client";

import { TimePicker12H } from "./time-input";

type Props = {
    date: Date | undefined
    onChange: (_d: Date | undefined) => void
}

export function TimePicker12HourWrapper({ date, onChange }: Props) {
    return <TimePicker12H setDate={onChange} date={date} />;
}