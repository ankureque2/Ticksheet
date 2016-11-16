import {Pipe, PipeTransform} from '@angular/core';
import{PlotStage} from '../../br.classes/sublocation';
@Pipe({
    name: 'stageFilter'
})

export class StageFilterPipe implements PipeTransform {
   transform(value: PlotStage[], args: {[headerId: number]: any}): PlotStage[] {
        let filter: number = <number> args["headerId"] ? args["headerId"] : null;
      
        return filter ? value.filter((stage: PlotStage) =>
            stage.ConStageHeaderID == filter) : value;
    }

}