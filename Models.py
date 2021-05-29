import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import pickle

from HelperFuctions import flat_json_input

from tensorflow.keras.models import model_from_json
import numpy as np

"""
arr = ['no', 'yes']
arr = [0, 1]
0 = "no"
1 = "yes"
"""


class Models:
    def __init__(self):
        self.easy_knn = None
        self.medium_knn = None
        self.hard_knn = None
        self.final_knn = None
        self.easy_svm = None
        self.medium_svm = None
        self.hard_svm = None
        self.final_svm = None
        self.easy_rf = None
        self.medium_rf = None
        self.hard_rf = None
        self.final_rf = None
        self.easy_nn = None
        self.medium_nn = None
        self.hard_nn = None
        self.final_nn = None

        self.chosen_model = None
        self.yesCount = 0
        self.noCount = 0
        self.yesProb = 0
        self.noProb = 0

    def __load_rf(self):
        with open("./Models/RandomForest/easy-rf.pkl", 'rb') as f:
            self.easy_rf = pickle.load(f)

        with open("./Models/RandomForest/medium-rf.pkl", 'rb') as f:
            self.medium_rf = pickle.load(f)

        with open("./Models/RandomForest/hard-rf.pkl", 'rb') as f:
            self.hard_rf = pickle.load(f)

        with open("./Models/RandomForest/final-rf.pkl", 'rb') as f:
            self.final_rf = pickle.load(f)

    def __load_svm(self):
        with open("./Models/SVM/easy-svm.pkl", 'rb') as f:
            self.easy_svm = pickle.load(f)

        with open("./Models/SVM/medium-svm.pkl", 'rb') as f:
            self.medium_svm = pickle.load(f)

        with open("./Models/SVM/hard-svm.pkl", 'rb') as f:
            self.hard_svm = pickle.load(f)

        with open("./Models/SVM/final-svm.pkl", 'rb') as f:
            self.final_svm = pickle.load(f)

    def __load_knn(self):
        with open("./Models/KNN/easy-knn.pkl", 'rb') as f:
            self.easy_knn = pickle.load(f)

        with open("./Models/KNN/medium-knn.pkl", 'rb') as f:
            self.medium_knn = pickle.load(f)

        with open("./Models/KNN/hard-knn.pkl", 'rb') as f:
            self.hard_knn = pickle.load(f)

        with open("./Models/KNN/final-knn.pkl", 'rb') as f:
            self.final_knn = pickle.load(f)

    def __load_nn(self):

        with open("./Models/NeuralNetwork/nn-easy.json", 'rb') as f:
            easy_nn = f.read()

        self.easy_nn = model_from_json(easy_nn)
        self.easy_nn.load_weights("./Models/NeuralNetwork/nn-easy-weights.h5")
        self.easy_nn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

        with open("./Models/NeuralNetwork/nn-medium.json", 'rb') as f:
            medium_nn = f.read()

        self.medium_nn = model_from_json(medium_nn)
        self.medium_nn.load_weights("./Models/NeuralNetwork/nn-medium-weights.h5")
        self.medium_nn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

        with open("./Models/NeuralNetwork/nn-hard.json", 'rb') as f:
            hard_nn = f.read()

        self.hard_nn = model_from_json(hard_nn)
        self.hard_nn.load_weights("./Models/NeuralNetwork/nn-hard-weights.h5")
        self.hard_nn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

        with open("./Models/NeuralNetwork/nn-final.json", 'rb') as f:
            final_nn = f.read()

        self.final_nn = model_from_json(final_nn)
        self.final_nn.load_weights("./Models/NeuralNetwork/nn-final-weights.h5")
        self.final_nn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    def load_all_models(self):
        print("Loading Models...")
        self.__load_rf()
        self.__load_knn()
        self.__load_svm()
        self.__load_nn()
        print("All Models Loaded...")

    def load_chosen_model(self):
        self.__load_nn()
        self.chosen_model = "nn"

    def predict_knn(self, easy, medium, hard):
        print("Predicting from KNN model...")
        easy_output = self.easy_knn.predict_proba(easy.reshape(1, -1))
        medium_output = self.medium_knn.predict_proba(medium.reshape(1, -1))
        hard_output = self.hard_knn.predict_proba(hard.reshape(1, -1))
        final = [[easy_output[0][0], easy_output[0][1], medium_output[0][0], medium_output[0][1], hard_output[0][0],
                  hard_output[0][1]]]
        final_output = self.final_knn.predict_proba(final)
        score = list(final_output[0])
        if score[0] > score[1]:
            self.noCount += 1
            self.noProb += score[0]
        else:
            self.yesCount += 1
            self.yesProb += score[1]
        print(final_output)
        return score

    def predict_rf(self, easy, medium, hard):
        print("Predicting from Random Forest model...")
        easy_output = self.easy_rf.predict_proba(easy.reshape(1, -1))
        medium_output = self.medium_rf.predict_proba(medium.reshape(1, -1))
        hard_output = self.hard_rf.predict_proba(hard.reshape(1, -1))
        final = [[easy_output[0][0], easy_output[0][1], medium_output[0][0], medium_output[0][1], hard_output[0][0],
                  hard_output[0][1]]]
        final_output = self.final_rf.predict_proba(final)
        score = list(final_output[0])
        if score[0] > score[1]:
            self.noCount += 1
            self.noProb += score[0]
        else:
            self.yesCount += 1
            self.yesProb += score[1]
        print(final_output)
        return score

    def predict_svm(self, easy, medium, hard):
        print("Predicting from SVM model...")
        easy_output = self.easy_svm.predict_proba(easy.reshape(1, -1))
        medium_output = self.medium_svm.predict_proba(medium.reshape(1, -1))
        hard_output = self.hard_svm.predict_proba(hard.reshape(1, -1))
        final = [[easy_output[0][0], easy_output[0][1], medium_output[0][0], medium_output[0][1], hard_output[0][0],
                  hard_output[0][1]]]
        final_output = self.final_svm.predict_proba(final)
        score = list(final_output[0])
        if score[0] > score[1]:
            self.noCount += 1
            self.noProb += score[0]
        else:
            self.yesCount += 1
            self.yesProb += score[1]
        print(final_output)
        return score

    def predict_nn(self, easy, medium, hard):
        print("Predicting from Neural Network...")
        easy_output = self.easy_nn.predict(easy.reshape(1, -1))
        medium_output = self.medium_nn.predict(medium.reshape(1, -1))
        hard_output = self.hard_nn.predict(hard.reshape(1, -1))
        final = np.array([easy_output[0], medium_output[0], hard_output[0]])
        final_output = self.final_nn.predict(final.reshape(1, -1))
        score = float(final_output[0])
        if score > 0.5:
            self.yesCount += 1
            self.yesProb += score
        else:
            self.noCount += 1
            self.noProb += (1 - score)

        print(final_output)
        return score

    def make_diagnosis(self, data):
        easy, medium, hard = flat_json_input(data)
        self.predict_knn(easy, medium, hard)
        self.predict_rf(easy, medium, hard)
        self.predict_svm(easy, medium, hard)
        self.predict_nn(easy, medium, hard)
        prediction = {
            "accuracy": 0,
            "diagnosis": "no",
        }
        if (self.yesCount > self.noCount) or (self.yesCount == self.noCount):
            accuracy = round((self.yesProb / self.yesCount) * 100, 2)
            prediction['accuracy'] = accuracy
            prediction['diagnosis'] = "yes"
        else:
            accuracy = round((self.noProb / self.noCount) * 100, 2)
            prediction['accuracy'] = accuracy
            prediction['diagnosis'] = "no"
        print(self.yesCount, self.yesProb, sep=",")
        print(self.noCount, self.noProb, sep=",")
        print(prediction)
        self.yesCount = 0
        self.noCount = 0
        self.yesProb = 0
        self.noProb = 0
        return prediction

    def make_chosen_diagnosis(self, data):
        easy, medium, hard = flat_json_input(data)
        prediction = {
            "accuracy": 0,
            "diagnosis": "no",
        }
        if self.chosen_model == "nn":
            score = self.predict_nn(easy, medium, hard)
            if score >= 0.5:
                accuracy = round(score * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "yes"
            else:
                accuracy = round((1 - score) * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "no"
        elif self.chosen_model == "knn":
            score = self.predict_knn(easy, medium, hard)
            if score[0] > score[1]:
                accuracy = round(score[0] * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "no"
            else:
                accuracy = round(score[1] * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "yes"

        elif self.chosen_model == "rf":
            score = self.predict_rf(easy, medium, hard)
            if score[0] > score[1]:
                accuracy = round(score[0] * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "no"
            else:
                accuracy = round(score[1] * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "yes"

        else:
            score = self.predict_svm(easy, medium, hard)
            if score[0] > score[1]:
                accuracy = round(score[0] * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "no"
            else:
                accuracy = round(score[1] * 100, 2)
                prediction['accuracy'] = accuracy
                prediction['diagnosis'] = "yes"

        print(prediction)
        self.yesCount = 0
        self.noCount = 0
        self.yesProb = 0
        self.noProb = 0
        return prediction
