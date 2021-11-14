import warnings
warnings.filterwarnings('ignore')

import os
dir_Path = 'C:\\'
os.chdir(dir_Path)

import pandas as pd
data = pd.read_csv(r"C:\Users\varan\Desktop\Downloads\db.csv")

from sklearn.model_selection import train_test_split

Independent_var = data.Description
Dependent_var = data.Target

IV_train, IV_test, DV_train, DV_test = train_test_split(Independent_var,Dependent_var,test_size=0.1, random_state=225)

print('IV_train :', len(IV_train))
print('IV_test :', len(IV_test))
print('DV_train :', len(DV_train))
print('DV_test :', len(DV_test))

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

tvec = TfidfVectorizer()
clf2 = LogisticRegression(solver="lbfgs")

from sklearn.pipeline import Pipeline

model = Pipeline([('vectorizer',tvec),('classifier',clf2)])
model.fit(IV_train, DV_train)

import joblib

path = r"C:\Users\varan\PycharmProjects\srmHack\finalized_model.sav"
assert os.path.isfile(path)
with open(path,'wb') as f:
    joblib.dump(model,f)


