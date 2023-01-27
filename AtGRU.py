import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error as mse
from sklearn.metrics import mean_absolute_error as mae
from sklearn.metrics import r2_score as r2
from tensorflow import keras
import attention

def mape(y_true, y_pred):
    return np.mean(np.abs((y_pred - y_true) / y_true))*100

#搭建初预测AtGRU模型 Building the initial prediction AtGRU model
class AtGRU():
    def __init__(self,X_train,Y_train,X_test,Y_test,scaled_tool):
        self.X_train =  np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
        self.Y_train = Y_train
        self.X_test = np.reshape(X_test,(X_test.shape[0],X_test.shape[1],1))
        self.Y_test = Y_test
        self.scaled_tool = scaled_tool

    def run(self):
        model = keras.models.Sequential()
        model.add(keras.layers.GRU(64, input_shape=(self.X_train.shape[1],1), return_sequences=True))
        model.add(keras.layers.Dropout(0.1))
        model.add(attention.Attention())
        model.add(keras.layers.Dense(1))
        model.summary()
        #配置和训练 Configuration and training
        model.compile(optimizer='Adam', loss='mse', metrics=['mae'])
        model.fit(self.X_train, self.Y_train, epochs=1000, batch_size=32)

        #初次预测 Initial Forecast
        predict = model.predict(self.X_test)
        pred_ = self.scaled_tool.inverse_transform(predict)
        self.Y_test = self.Y_test.reshape(self.Y_test.shape[0],1)
        test_ = self.scaled_tool.inverse_transform(self.Y_test)
        #

        #计算初次预测评价指标 Calculation of initial forecast evaluation indicators
        print('first MAPE : ', mape(test_,pred_))
        print('first MAE : ', mae(test_, pred_))
        print('first R2 : ', r2(test_, pred_))
        print('first RMSE : ', np.sqrt(mse(test_,pred_)))
        metrics0 = []
        metrics0.append([mape(test_,pred_), mae(test_,pred_), r2(test_,pred_), np.sqrt(mse(test_,pred_))])
        metrics0_ = pd.DataFrame(metrics0, columns=['MAPE',' MAE', 'R2', 'RMSE'])
        metrics0_.to_excel(r"AtGRU Evaluation data\AtGRU Evaluation of initial prediction1.xlsx")
        #
        #绘制结果图 Mapping the results
        plt.figure(1)
        plt.plot(pred_, color='red', label='Predicted value')
        plt.plot(test_, color='yellow', label='True value')
        plt.title("Refinery production")
        plt.xlabel("Time")
        plt.ylabel("Refinery production value")
        plt.legend()
        plt.savefig(r"AtGRU Evaluation data\AtGRU Prediction graph1")
        plt.show()

        #保存数据与模型 Save data and models
        model.save("AtGRU.h5")
        np.savetxt('AtGRU Prediction data\AtGRU Preliminary label.csv',test_,delimiter=',')
        np.savetxt('AtGRU Prediction data\AtGRU Preliminary forecast.csv', pred_, delimiter=',')
        np.savetxt('AtGRU Prediction data\AtGRU Predict_error.csv',pred_-test_,delimiter=',')
