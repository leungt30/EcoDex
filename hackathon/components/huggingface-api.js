import { HfInference } from "@huggingface/inference";

const hf_key = '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';
//const hf_key = process.env.EXPO_PUBLIC_HF;
const hf = new HfInference(hf_key);

export default async function image_classification(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Classify image using huggingface
    const classifications = await hf.imageClassification({
        data: blob,
        model: 'microsoft/resnet-50',
    });

    // let labels = '';//'[';
    // classifications.forEach((classification, i) => {
    //     labels += classification.label + (i === classifications.length - 1 ? '' : ', ');
    // });
    //labels += ']';
    //console.log('Labels: ', labels);

    // const result = await hf.textGeneration({
    //     model: 'google/flan-t5-base',
    //     inputs: `Return the plant or animal in the list ${labels}`
    // });
    // console.log('Result: ', result);

    // Return classification
    return classifications[0].label.split(',')[0];//result.generated_text;
}
