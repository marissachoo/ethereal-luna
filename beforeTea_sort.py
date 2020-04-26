# The sketch for assorting food distribution among recipients using Machine Learning.
# Uses kNN algorithm with Tenserflow to classify families to food packages
# Classification is based on family headcount and special needs(warga emas)

import numpy as np
import pandas as pd
import tensorflow as tf

recipients = pd.read_csv("C:/Users/User/Downloads/crh-families-deidentified-csv-1.csv", nrows = 50)
x = recipients[['family_count_average','family_count_seniors']]
x = x.to_numpy()
#print(x)
y = np.array([3, 1, 2, 1, 0, 3, 2, 2, 0, 1, 2, 1, 2, 2, 1, 1, 0, 3, 3, 0, 2, 0, 2, 3, 0, 1, 2, 0, 3, 1, 1, 0, 3, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 1, 2, 1, 1, 0, 3])
#print(y)

package_labels = ["Package A", "Package B", "Package A + special", "Package B + special"]

#one hot encoding
y = np.eye(len(set(y)))[y]
print(y)

# normalise the x data to the range 0 to 1
x = (x - x.min(axis=0)) / (x.max(axis=0) - x.min(axis=0))
print(x)

# create indices for the train-test split
np.random.seed(42)
split = 0.8 # this makes 120 train and 30 test features
train_indices = np.random.choice(len(x), round(len(x) * split), replace=False)
print(train_indices)
test_indices =np.array(list(set(range(len(x))) - set(train_indices)))
print(test_indices)

# the train-test split
train_x = x[train_indices]
test_x = x[test_indices]
train_y = y[train_indices]
test_y = y[test_indices]

#
def prediction(train_x, test_x, train_y,k):
    print(test_x)
    d0 = tf.expand_dims(test_x, axis =1)
    d1 = tf.subtract(train_x, d0)
    d2 = tf.abs(d1)
    distances = tf.reduce_sum(input_tensor=d2, axis=2)
    print(distances)
    # or
    # distances = tf.reduce_sum(tf.abs(tf.subtract(train_x, tf.expand_dims(test_x, axis =1))), axis=2)
    _, top_k_indices = tf.nn.top_k(tf.negative(distances), k=k)
    top_k_labels = tf.gather(train_y, top_k_indices)
    predictions_sum = tf.reduce_sum(input_tensor=top_k_labels, axis=1)
    pred = tf.argmax(input=predictions_sum, axis=1)
    return pred

k = 5

i, total = 0 , 0
results = zip(prediction(train_x, test_x, train_y,k), test_y) #concatenate predicted label with actual label
print("Predicted        Actual")
print("---------        ------")
for pred, actual in results:
    print(i, package_labels[pred.numpy()],"\t",flower_labels[np.argmax(actual)] )
    if pred.numpy() == np.argmax(actual):
        total += 1
    i += 1
accuracy = round(total/len(test_x),3)*100
print("Accuracy = ",accuracy,"%")
