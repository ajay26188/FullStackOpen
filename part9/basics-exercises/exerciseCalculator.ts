export interface Result 
{ 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

export const calculateExercises = (targetHours: number, exerciseHours: number[]): Result => {
    let ratingDescription;
    let rating;
    const filterDays = exerciseHours.filter(hour => hour !== 0);

    const averageTime = (exerciseHours.reduce((a,b) => a+b)) / exerciseHours.length;

    if (averageTime >= targetHours) {
        rating = 3;
        ratingDescription = "excellent";
    }
    else if (averageTime >= targetHours*0.75) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "you need to do better";
    }


    return ({ 
        periodLength: exerciseHours.length,
        trainingDays: filterDays.length,
        success: targetHours > averageTime ? false : true,
        rating: rating,
        ratingDescription,
        target: targetHours,
        average: averageTime
      });
};

if (require.main === module) {
    try {
      const args = process.argv.slice(2);
  
      if (args.length < 2) {
        throw new Error('Not enough arguments. Provide at least a target and one day value.');
      }
  
      const [targetStr, ...dailyStrs] = args;
  
      const target = Number(targetStr);
      const daily_exercises = dailyStrs.map(Number);
  
      if (isNaN(target) || daily_exercises.some(n => isNaN(n))) {
        throw new Error('All inputs must be numbers');
      }
  
      const result = calculateExercises(target, daily_exercises);
      console.log(result);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
  
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
  
      console.error(errorMessage);
    }
  }
  
