export const calculateBmi = (height: number, weight: number): string => {
    //console.log(process.argv);
    const bmi = (weight) / ((height*height)/10000);

    switch(true) {
        case bmi < 16.0:
            return 'Underweight (Severe thinness)';
        case bmi >= 16.0 && bmi < 17.0:
            return 'Underweight (Moderate thinness)';
        case bmi >= 17.0 && bmi < 18.5:
            return 'Underweight (Mild thinness)';
        case bmi >= 18.5 && bmi < 25.0:
            return 'Normal range';
        case bmi >= 25.0 && bmi < 30.0:
            return 'Overweight (Pre-obese)';
        case bmi >= 30.0 && bmi < 35.0:
            return 'Obese (Class I)';
        case bmi >= 35.0 && bmi < 40.0:
            return 'Obese (Class II)';
        case bmi >= 40.0:
            return 'Obese (Class III)';
        default:
            return 'Invalid BMI';
    }
};

if (require.main === module) {
    console.log(calculateBmi(Number(process.argv[2]),Number(process.argv[3])));
}

