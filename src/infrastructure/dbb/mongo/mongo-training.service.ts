import {Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {MongoConnectionService} from './mongo-connection.service';
import { MongoDBB_training, returnCode } from '../../../shared/global-variable';
import { ITrainingDDBService } from '../i-training-service';
import { TrainingAddInputModel } from '../../../models/input/training-add-input.model';
import { AddUpdateOutput } from '../../../models/output/add-update-output.model';
import { ErrorOutput } from '../../../models/output/error-output.model';
import { TrainingList } from '../../../models/output/training-output.model';

export class TrainingDBBMongo implements ITrainingDDBService{

    public mConnec : MongoConnectionService = new MongoConnectionService();

    getTrainings(userId: string): Observable<TrainingList | ErrorOutput>{
        const trainingsToFind = {'login' : userId};
        const select =  {_id:0, login:1, id:1, title: 2, creationDate:3};

        return this.mConnec.executeSelectRequest(MongoDBB_training.dbb, MongoDBB_training.collec_training_list, trainingsToFind, select).pipe(
            map(data =>  new TrainingList(data)),
            catchError(this.handleError)
        );
    }

    addTraining(training: TrainingAddInputModel): Observable<AddUpdateOutput | ErrorOutput>{
        return this.mConnec.executeInsertRequest(MongoDBB_training.dbb, MongoDBB_training.collec_training_list, training).pipe(
            map(data => new AddUpdateOutput(returnCode.inserted)),
            catchError(this.handleError)
        );
    }

    deleteTraining(trainingId: number): Observable<AddUpdateOutput | ErrorOutput>{
        const trainingsToDelete = {'id' :  trainingId};
        return this.mConnec.executeDeleteRequest(MongoDBB_training.dbb, MongoDBB_training.collec_training_list, trainingsToDelete).pipe(
            map(data => new AddUpdateOutput(returnCode.deleted)),
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error);
    }
}

